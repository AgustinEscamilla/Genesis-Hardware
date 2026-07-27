// aqui maestro yo documente este archivo para mantener trazabilidad
import { collection, doc, getDocs, onSnapshot, runTransaction } from 'firebase/firestore'
import { db } from './conexion_firebase'

const coleccion = () => collection(db, 'inventario')
const referencia = (productoId) => doc(db, 'inventario', productoId)

// pos esto funciona para sumar stock ligado estrictamente al id del producto del catalogo
export const registrarMercancia = async ({ productoId, nombreProducto, volumen, tipoUnidad }) => {
  const cantidad = Number(volumen || 0)
  if (!productoId || cantidad <= 0) throw new Error('Cantidad de inventario invalida')
  await runTransaction(db, async (transaccion) => {
    const inventarioRef = referencia(productoId)
    const catalogoRef = doc(db, 'catalogo', productoId)
    const inventario = await transaccion.get(inventarioRef)
    const catalogo = await transaccion.get(catalogoRef)
    const actual = Number(inventario.data()?.volumen || 0)
    if (!catalogo.exists()) throw new Error('Producto de catalogo no encontrado')
    transaccion.set(inventarioRef, { productoId, nombreProducto, tipoUnidad, stockMinimo: 5, volumen: actual + cantidad, fechaIngreso: new Date().toISOString() }, { merge: true })
    transaccion.update(catalogoRef, { stockVisible: actual + cantidad })
  })
}

export const obtenerInventario = async () => {
  const snap = await getDocs(coleccion())
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const escucharInventario = (al_cambiar, al_error) => onSnapshot(coleccion(), (snap) => {
  al_cambiar(snap.docs.map(d => ({ id: d.id, ...d.data() })))
}, al_error)
