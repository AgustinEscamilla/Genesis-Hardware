import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from './conexion_firebase'

// aqui maestro yo defino la coleccion de lineas de producto en firestore
const coleccion = () => collection(db, 'lineas_producto')

export const obtenerLineas = async () => {
  // esto sirve para traer todas las lineas registradas en firestore
  const instantanea = await getDocs(coleccion())
  return instantanea.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const agregarLinea = async (datos) => {
  // aqui puse profe la insercion de una linea nueva
  await addDoc(coleccion(), datos)
}

export const actualizarLinea = async (id, datos) => {
  // maestro funciona asi para actualizar los campos de una linea existente
  await updateDoc(doc(db, 'lineas_producto', id), datos)
}

export const eliminarLinea = async (id) => {
  // pos esto funciona para borrar una linea por su id
  await deleteDoc(doc(db, 'lineas_producto', id))
}

// aqui maestro yo subo imagen de linea para mostrarla en menu principal
export const subirImagenLinea = async (archivo) => {
  const storageRef = ref(storage, `lineas/${Date.now()}_${archivo.name}`)
  await uploadBytes(storageRef, archivo)
  return getDownloadURL(storageRef)
}
