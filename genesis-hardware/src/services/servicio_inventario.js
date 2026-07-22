// aqui maestro yo documente este archivo para mantener trazabilidad
import { collection, doc, getDocs, increment, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from './conexion_firebase'

const coleccion = () => collection(db, 'inventario')
const referencia = (productoId) => doc(db, 'inventario', productoId)

// pos esto funciona para sumar stock ligado estrictamente al id del producto del catalogo
export const registrarMercancia = async ({ productoId, nombreProducto, volumen, tipoUnidad }) => {
  await setDoc(referencia(productoId), {
    productoId,
    nombreProducto,
    tipoUnidad,
    stockMinimo: 5,
    volumen: increment(Number(volumen || 0)),
    fechaIngreso: new Date().toISOString(),
  }, { merge: true })
}

export const obtenerInventario = async () => {
  const snap = await getDocs(coleccion())
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const escucharInventario = (alCambiar) => onSnapshot(coleccion(), (snap) => {
  alCambiar(snap.docs.map(d => ({ id: d.id, ...d.data() })))
})
