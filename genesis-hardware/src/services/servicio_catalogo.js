import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from './conexion_firebase'

// aqui maestro yo defino la coleccion de productos del catalogo en firestore
const coleccion = () => collection(db, 'catalogo')

export const obtenerCatalogo = async () => {
  // esto sirve para traer todos los productos del catalogo de firestore
  const instantanea = await getDocs(coleccion())
  return instantanea.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const escucharCatalogo = (al_cambiar, al_error) => onSnapshot(coleccion(), (instantanea) => {
  al_cambiar(instantanea.docs.map(d => ({ id: d.id, ...d.data() })))
}, al_error)

export const actualizarProducto = async (id, datos) => {
  // aqui puse profe la actualizacion de imagen y descripcion de precios del producto
  await updateDoc(doc(db, 'catalogo', id), datos)
}

export const agregarProducto = async (datos) => {
  // maestro funciona asi al insertar un producto nuevo al catalogo
  await addDoc(coleccion(), datos)
}

export const eliminarProducto = async (id) => {
  // esto sirve para borrar un producto existente del catalogo
  await deleteDoc(doc(db, 'catalogo', id))
}

export const subirImagenProducto = async (archivo) => {
  // aqui maestro yo subo el archivo a storage y devuelvo la url de descarga publica
  const storageRef = ref(storage, `catalogo/${Date.now()}_${archivo.name}`)
  await uploadBytes(storageRef, archivo)
  return getDownloadURL(storageRef)
}
