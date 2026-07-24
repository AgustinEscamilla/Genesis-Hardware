import { arrayUnion, collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { db } from './conexion_firebase'
import { crearNotificacion } from './servicio_notificaciones'

// aqui maestro yo dejo la secuencia oficial de estados operativos del pedido
export const ESTADOS_PEDIDO = {
  RECIBIDO: 'recibido',
  PENDIENTE_RECOLECCION: 'pendiente_recoleccion',
  EN_EMPAQUE: 'en_empaque',
  LISTO_DESPACHO: 'listo_despacho',
  EN_REPARTO: 'en_reparto',
  ENTREGADO: 'entregado',
  RECHAZADO: 'rechazado'
}

export const mensajesPorEstado = {
  recibido: 'tu pedido fue recibido y entra a la cola de empaque',
  pendiente_recoleccion: 'tu pedido fue pagado y esta pendiente de recoleccion por el repartidor',
  en_empaque: 'tu pedido esta en proceso de empaque',
  listo_despacho: 'tu pedido esta listo para despacho',
  en_reparto: 'tu pedido esta en camino con el repartidor',
  entregado: 'tu pedido fue entregado con exito',
  rechazado: 'tu pedido fue rechazado en la entrega y sera gestionado por un asesor'
}

// aqui maestro yo escucho pedidos por estado para render en tiempo real
export const escucharPedidosPorEstado = (estado, alCambiar) => {
  const q = query(collection(db, 'pedidos'), where('estado', '==', estado))
  return onSnapshot(q, (snap) => alCambiar(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
}

// pos esto funciona para mover un pedido a la siguiente etapa y avisar al cliente
export const actualizarEstadoPedido = async (pedido, estado, camposExtra = {}) => {
  const fecha = new Date().toISOString()
  await updateDoc(doc(db, 'pedidos', pedido.id), {
    estado,
    fechaEstado: fecha,
    historialEstados: arrayUnion({ estado, fecha }),
    ...camposExtra
  })
  const mensaje = mensajesPorEstado[estado]
  if (pedido.clienteId && mensaje) {
    await crearNotificacion({ clienteId: pedido.clienteId, pedidoId: pedido.id, mensaje })
  }
}
