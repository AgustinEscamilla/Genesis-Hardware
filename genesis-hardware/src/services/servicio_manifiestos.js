import { arrayUnion, collection, doc, onSnapshot, updateDoc, writeBatch } from 'firebase/firestore'
import { db } from './conexion_firebase'
import { actualizarEstadoPedido, ESTADOS_PEDIDO, es_transicion_pedido_valida, mensajesPorEstado } from './servicio_flujo_pedidos'
import { crearNotificacion } from './servicio_notificaciones'
import { ciudad_logistica } from './constantes_logistica'
import { formatear_direccion } from './formato_direccion'

const colManifiestos = () => collection(db, 'manifiestos')

// aqui maestro yo agrupo pedidos listos para despacho por su zona logistica
export const agruparPedidosPorZona = (pedidos = []) => pedidos.reduce((acc, p) => {
  const zona = p.zonaLogistica || ciudad_logistica
  acc[zona] = acc[zona] || []
  acc[zona].push(p)
  return acc
}, {})

// pos esto funciona para escuchar en vivo todos los manifiestos generados
export const escucharManifiestos = (al_cambiar, al_error) => onSnapshot(colManifiestos(), (snap) => al_cambiar(snap.docs.map(d => ({ id: d.id, ...d.data() }))), al_error)

export const iniciarRutaRepartidor = async (paradas = [], repartidorId = null) => {
  const pedidos = paradas.map((p) => p.pedido || p)
  if (pedidos.some((p) => !formatear_direccion(p.direccionEntrega))) throw new Error('La ruta contiene un pedido sin direccion de entrega')
  if (pedidos.some((p) => !es_transicion_pedido_valida(p.estado, ESTADOS_PEDIDO.EN_REPARTO))) throw new Error('La ruta contiene un pedido fuera de secuencia')
  const lote = writeBatch(db)
  const fecha = new Date().toISOString()
  const ids = []
  Object.entries(agruparPedidosPorZona(pedidos)).forEach(([zona, grupo]) => {
    const manifiestoRef = doc(colManifiestos())
    ids.push(manifiestoRef.id)
    lote.set(manifiestoRef, { zona, pedidosIds: grupo.map((p) => p.id), estado: ESTADOS_PEDIDO.EN_REPARTO, creadoEn: fecha, repartidorId })
    grupo.forEach((pedido) => lote.update(doc(db, 'pedidos', pedido.id), { estado: ESTADOS_PEDIDO.EN_REPARTO, fechaEstado: fecha, historialEstados: arrayUnion({ estado: ESTADOS_PEDIDO.EN_REPARTO, fecha }), manifiestoId: manifiestoRef.id, repartidorId }))
  })
  await lote.commit()
  await Promise.all(pedidos.filter((p) => p.clienteId).map((p) => crearNotificacion({ clienteId: p.clienteId, pedidoId: p.id, mensaje: mensajesPorEstado[ESTADOS_PEDIDO.EN_REPARTO] })))
  return ids
}

export const generarManifiesto = async (zona, pedidos = [], repartidorId = null) => {
  const ids = await iniciarRutaRepartidor(pedidos.map((pedido) => ({ pedido })), repartidorId)
  return ids.find((id) => id) || zona
}

// aqui puse profe para marcar un manifiesto completo como entregado
export const marcarManifiestoEntregado = async (manifiesto, pedidosDelManifiesto = []) => {
  await updateDoc(doc(db, 'manifiestos', manifiesto.id), { estado: ESTADOS_PEDIDO.ENTREGADO })
  await Promise.all(pedidosDelManifiesto.map((p) => actualizarEstadoPedido(p, ESTADOS_PEDIDO.ENTREGADO)))
}
