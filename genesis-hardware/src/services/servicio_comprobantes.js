import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from './conexion_firebase'

const coleccionComprobantes = () => collection(db, 'comprobantes_entrega')

// aqui maestro yo guardo la evidencia fotografica que certifica la entrega
export const crearComprobante = async ({ pedidoId, repartidorId, imagenUrl, nota }) => {
    await addDoc(coleccionComprobantes(), { pedidoId, repartidorId, imagenUrl, nota, fecha: new Date().toISOString() })
}

// pos esto funciona para escuchar el comprobante asociado a un pedido especifico
export const escucharComprobantePedido = (pedidoId, alCambiar) => {
    const q = query(coleccionComprobantes(), where('pedidoId', '==', pedidoId))
    return onSnapshot(q, (snap) => alCambiar(snap.docs[0] ? { id: snap.docs[0].id, ...snap.docs[0].data() } : null))
}
