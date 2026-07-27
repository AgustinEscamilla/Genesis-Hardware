import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from './conexion_firebase'

// aqui maestro yo defino la coleccion de noticias en firestore
const coleccion = () => collection(db, 'noticias')

export const obtenerNoticias = async () => {
  // esto sirve para traer todas las noticias registradas en firestore
  const instantanea = await getDocs(coleccion())
  return instantanea.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const agregarNoticia = async (datos) => {
  // aqui puse profe la insercion de una noticia nueva
  await addDoc(coleccion(), { ...datos, creadoEn: serverTimestamp(), actualizadoEn: serverTimestamp() })
}

export const actualizarNoticia = async (id, datos) => {
  // maestro funciona asi para actualizar una noticia existente
  await updateDoc(doc(db, 'noticias', id), { ...datos, actualizadoEn: serverTimestamp() })
}

export const eliminarNoticia = async (id) => {
  // pos esto funciona para borrar una noticia por su id
  await deleteDoc(doc(db, 'noticias', id))
}
