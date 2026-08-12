import { addDoc, collection, doc, onSnapshot, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { db } from './conexion_firebase'

const coleccionReclamos = () => collection(db, 'reclamos')

// aqui maestro yo guardo el ticket de reclamo vinculado al pedido del cliente
export const crearReclamo = async ({ pedidoId, clienteId, motivo, descripcion }) => {
    await addDoc(coleccionReclamos(), {
        pedidoId,
        clienteId,
        motivo,
        descripcion,
        estado: 'pendiente',
        fecha: new Date().toISOString()
    })
}

// pos esto funciona para escuchar en vivo los reclamos que el cliente ha levantado
export const escucharReclamosCliente = (clienteId, alCambiar) => {
    const q = query(coleccionReclamos(), where('clienteId', '==', clienteId))
    return onSnapshot(q, (snap) => {
        const datos = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        datos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        alCambiar(datos)
    })
}

export const escucharReclamosAdministrador = (alCambiar, alError) =>
    onSnapshot(coleccionReclamos(), (snap) => {
        const datos = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        alCambiar(datos)
    }, alError)

export const responderReclamo = async ({ reclamoId, respuesta }) => {
    await updateDoc(doc(db, 'reclamos', reclamoId), {
        respuesta: String(respuesta || '').trim(),
        estado: 'respondido',
        respondidoEn: serverTimestamp(),
    })
}
