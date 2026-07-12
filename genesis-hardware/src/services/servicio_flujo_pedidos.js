import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { db } from './conexion_firebase'

// aqui maestro yo escucho pedidos por estado para render en tiempo real
export const escucharPedidosPorEstado = (estado, alCambiar) => {
  const q = query(collection(db, 'pedidos'), where('estado', '==', estado))
  return onSnapshot(q, (snap) => alCambiar(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
}

// pos esto funciona para mover pedidos entre etapas operativas
export const actualizarEstadoPedido = async (id, estado) => {
  await updateDoc(doc(db, 'pedidos', id), { estado, fechaEstado: new Date().toISOString() })
}
