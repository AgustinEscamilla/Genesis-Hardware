import { addDoc, collection, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from './conexion_firebase'

const coleccionReportes = () => collection(db, 'reportes_fallas')

// aqui maestro yo guardo cada reporte de falla mecanica que el repartidor envia
export const crearReporteFalla = async ({ repartidorId, cofre, mensaje }) => {
  await addDoc(coleccionReportes(), {
    repartidorId,
    cofre,
    mensaje,
    fecha: serverTimestamp(),
    estado: 'pendiente'
  })
}

export const escucharReportesFallas = (alCambiar, alError) =>
  onSnapshot(coleccionReportes(), (snap) => {
    alCambiar(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  }, alError)

export const responderReporteFalla = async ({ reporteId, respuesta }) => {
  await updateDoc(doc(db, 'reportes_fallas', reporteId), {
    respuesta: String(respuesta || '').trim(),
    estado: 'respondido',
    respondidoEn: serverTimestamp(),
  })
}
