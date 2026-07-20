import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
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
