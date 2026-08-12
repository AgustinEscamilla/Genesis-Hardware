import { addDoc, collection, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore'
import { auth, db } from './conexion_firebase'

const coleccion_reportes = () => collection(db, 'reportes_inventario')

export const crear_reporte_inventario = async ({ producto, pedido, tipo, descripcion }) => {
  const empleado_id = auth.currentUser?.uid
  if (!empleado_id) throw new Error('La sesion del empleado no esta disponible')
  if (!producto.trim() || !descripcion.trim()) throw new Error('Indica el producto y describe el problema')
  await addDoc(coleccion_reportes(), {
    empleadoId: empleado_id,
    producto: producto.trim(),
    pedido: pedido.trim(),
    tipo,
    descripcion: descripcion.trim(),
    estado: 'pendiente',
    fecha: serverTimestamp(),
  })
}

export const escuchar_reportes_inventario = (alCambiar, alError) =>
  onSnapshot(coleccion_reportes(), (snap) => {
    alCambiar(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  }, alError)

export const responder_reporte_inventario = async ({ reporteId, respuesta }) => {
  await updateDoc(doc(db, 'reportes_inventario', reporteId), {
    respuesta: String(respuesta || '').trim(),
    estado: 'respondido',
    respondidoEn: serverTimestamp(),
  })
}
