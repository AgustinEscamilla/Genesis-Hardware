import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from './conexion_firebase'

// aqui maestro yo escucho en vivo los pedidos de un cliente para su seguimiento
export const escucharPedidosCliente = (clienteId, alCambiar) => {
  const q = query(collection(db, 'pedidos'), where('clienteId', '==', clienteId))
  return onSnapshot(q, (snap) => {
    const datos = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    datos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    alCambiar(datos)
  })
}
