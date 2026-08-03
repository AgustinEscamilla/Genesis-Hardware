import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from './conexion_firebase'

// aqui maestro yo defino la coleccion de noticias en firestore
const coleccion = () => collection(db, 'noticias')

export const obtenerNoticias = async () => {
  // esto sirve para traer todas las noticias registradas en firestore
  const instantanea = await getDocs(coleccion())
  return instantanea.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const sembrarNoticiasIniciales = async () => {
  const existentes = await getDocs(coleccion())
  if (!existentes.empty) return existentes.docs.map(d => ({ id: d.id, ...d.data() }))
  const noticias_iniciales = [
    ['envios-campeche', { titulo: 'Envios disponibles en la ciudad de Campeche', descripcion: 'Realizamos entregas dentro de la ciudad de Campeche. Confirma tu direccion en tu perfil antes de comprar.', etiqueta: 'Aviso de envio', valor: 'Publicado' }],
    ['entrega-local-campeche', { titulo: 'Entrega local sin costo adicional', descripcion: 'Disfruta entrega local en Campeche durante la temporada escolar en pedidos participantes.', etiqueta: 'Promocion', valor: 'Publicado' }],
    ['promociones-componentes', { titulo: 'Promociones en componentes seleccionados', descripcion: 'Consulta el catalogo para encontrar descuentos y disponibilidad actualizada en componentes.', etiqueta: 'Promocion', valor: 'Publicado' }]
  ]
  await Promise.all(noticias_iniciales.map(([id, noticia]) => setDoc(doc(db, 'noticias', id), { ...noticia, creadoEn: serverTimestamp(), actualizadoEn: serverTimestamp() })))
  return obtenerNoticias()
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
