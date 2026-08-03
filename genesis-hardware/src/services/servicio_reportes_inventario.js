import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
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
