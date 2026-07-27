import { collection, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { db } from './conexion_firebase'
import { actualizarEstadoPedido, ESTADOS_PEDIDO } from './servicio_flujo_pedidos'

const colManifiestos = () => collection(db, 'manifiestos')

// aqui maestro yo agrupo pedidos listos para despacho por su zona logistica
export const agruparPedidosPorZona = (pedidos = []) => pedidos.reduce((acc, p) => {
  const zona = p.zonaLogistica || 'sin_zona'
  acc[zona] = acc[zona] || []
  acc[zona].push(p)
  return acc
}, {})

// pos esto funciona para escuchar en vivo todos los manifiestos generados
export const escucharManifiestos = (al_cambiar, al_error) => onSnapshot(colManifiestos(), (snap) => al_cambiar(snap.docs.map(d => ({ id: d.id, ...d.data() }))), al_error)

// esto sirve para crear el manifiesto y pasar sus pedidos a estado en reparto
export const generarManifiesto = async (zona, pedidos = []) => {
  const manifiestoRef = doc(colManifiestos())
  const pedidosIds = pedidos.map((p) => p.id)
  await setDoc(manifiestoRef, { zona, pedidosIds, estado: ESTADOS_PEDIDO.EN_REPARTO, creadoEn: new Date().toISOString() })
  await Promise.all(pedidos.map((p) => actualizarEstadoPedido(p, ESTADOS_PEDIDO.EN_REPARTO, { manifiestoId: manifiestoRef.id })))
  return manifiestoRef.id
}

// aqui puse profe para marcar un manifiesto completo como entregado
export const marcarManifiestoEntregado = async (manifiesto, pedidosDelManifiesto = []) => {
  await updateDoc(doc(db, 'manifiestos', manifiesto.id), { estado: ESTADOS_PEDIDO.ENTREGADO })
  await Promise.all(pedidosDelManifiesto.map((p) => actualizarEstadoPedido(p, ESTADOS_PEDIDO.ENTREGADO)))
}
