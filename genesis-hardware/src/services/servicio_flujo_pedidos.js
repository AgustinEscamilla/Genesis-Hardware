import { arrayUnion, collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { db } from './conexion_firebase'
import { crearNotificacion } from './servicio_notificaciones'
import { estados_pedido, mensajes_por_estado, es_transicion_pedido_valida } from './constantes_flujo_pedidos'

export const ESTADOS_PEDIDO = Object.freeze({
  RECIBIDO: estados_pedido.recibido,
  PENDIENTE_RECOLECCION: estados_pedido.pendiente_recoleccion,
  EN_EMPAQUE: estados_pedido.en_empaque,
  LISTO_DESPACHO: estados_pedido.listo_despacho,
  EN_REPARTO: estados_pedido.en_reparto,
  ENTREGADO: estados_pedido.entregado,
  RECHAZADO: estados_pedido.rechazado,
})
export const mensajesPorEstado = mensajes_por_estado
export { es_transicion_pedido_valida }

export const escucharPedidosPorEstado = (estado, al_cambiar, al_error) => {
  const consulta = query(collection(db, 'pedidos'), where('estado', '==', estado))
  return onSnapshot(consulta, (snap) => al_cambiar(snap.docs.map((d) => ({ id: d.id, ...d.data() }))), al_error)
}

export const actualizarEstadoPedido = async (pedido, estado, camposExtra = {}) => {
  if (!es_transicion_pedido_valida(pedido?.estado, estado)) throw new Error('Transicion de pedido no permitida')
  const fecha = new Date().toISOString()
  await updateDoc(doc(db, 'pedidos', pedido.id), { estado, fechaEstado: fecha, historialEstados: arrayUnion({ estado, fecha }), ...camposExtra })
  const mensaje = mensajes_por_estado[estado]
  if (pedido.clienteId && mensaje) await crearNotificacion({ clienteId: pedido.clienteId, pedidoId: pedido.id, mensaje })
}
