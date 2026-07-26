import { addDoc, collection, deleteDoc, getDocs } from 'firebase/firestore'
import { db } from './conexion_firebase'
import { productos_discos } from './datos_catalogo_discos'
import { productos_memoria } from './datos_catalogo_memoria'
import { productos_procesadores } from './datos_catalogo_procesadores'
import { productos_ssd } from './datos_catalogo_ssd'
import { productos_video } from './datos_catalogo_video'

const coleccion_catalogo = () => collection(db, 'catalogo')
const productos_semilla = [
  ...productos_video,
  ...productos_procesadores,
  ...productos_memoria,
  ...productos_discos,
  ...productos_ssd,
]

export const sembrar_catalogo_ejemplo = async () => {
  const snapshot = await getDocs(coleccion_catalogo())
  for (const documento of snapshot.docs) await deleteDoc(documento.ref)
  for (const producto of productos_semilla) await addDoc(coleccion_catalogo(), producto)
}
