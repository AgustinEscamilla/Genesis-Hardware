import { addDoc, collection, doc, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { db } from './conexion_firebase'

const colNotificaciones = () => collection(db, 'notificaciones')

// aqui maestro yo guardo una notificacion nueva para el cliente dueno del pedido
export const crearNotificacion = async ({ clienteId, pedidoId, mensaje }) => {
  if (!clienteId) return
  await addDoc(colNotificaciones(), { clienteId, pedidoId, mensaje, leido: false, fecha: new Date().toISOString() })
}

// pos esto funciona para escuchar en vivo las notificaciones de un cliente
export const escucharNotificacionesCliente = (clienteId, alCambiar) => {
  const q = query(colNotificaciones(), where('clienteId', '==', clienteId))
  return onSnapshot(q, (snap) => {
    const datos = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    datos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    alCambiar(datos)
  })
}

export const escucharNotificacionesAdmin = (alCambiar) => {
  const q = query(colNotificaciones(), orderBy('fecha', 'desc'))
  return onSnapshot(q, (snap) => {
    const datos = snap.docs.map((d) => adaptarNotificacionAdmin({ id: d.id, ...d.data() }))
    alCambiar(datos)
  })
}

const adaptarNotificacionAdmin = (notificacion) => {
  const folio = String(notificacion.pedidoId || '').slice(0, 8) || 'sin folio'
  const mensaje = String(notificacion.mensaje || '').toLowerCase()
  if (mensaje.includes('pendiente de recoleccion')) return { ...notificacion, mensaje: `Nuevo pedido ${folio} pendiente de recoleccion` }
  if (mensaje.includes('fue entregado')) return { ...notificacion, mensaje: `Pedido ${folio} entregado correctamente` }
  if (mensaje.includes('fue rechazado')) return { ...notificacion, mensaje: `Pedido ${folio} rechazado requiere revision` }
  return { ...notificacion, mensaje: `Actualizacion del pedido ${folio}` }
}

// esto sirve para marcar una notificacion como leida desde la campana
export const marcarNotificacionLeida = async (id) => {
  await updateDoc(doc(db, 'notificaciones', id), { leido: true })
}
