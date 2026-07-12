// aqui maestro yo documente este archivo para mantener trazabilidad
import { addDoc, collection, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from './conexion_firebase'

const coleccion = () => collection(db, 'inventario')

export const registrarMercancia = async (datos) => {
  await addDoc(coleccion(), {
    ...datos,
    volumen: Number(datos.volumen || 0),
    stockMinimo: Number(datos.stockMinimo || 5),
    fechaIngreso: new Date().toISOString(),
  })
}

export const obtenerInventario = async () => {
  const snap = await getDocs(coleccion())
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const escucharInventario = (alCambiar) => onSnapshot(coleccion(), (snap) => {
  alCambiar(snap.docs.map(d => ({ id: d.id, ...d.data() })))
})
