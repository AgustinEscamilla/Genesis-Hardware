// aqui maestro yo documente este archivo para mantener trazabilidad
import { collection, doc, getDocs, onSnapshot, runTransaction } from 'firebase/firestore'
import { db } from './conexion_firebase'

const coleccion = () => collection(db, 'inventario')
const referencia = (productoId) => doc(db, 'inventario', productoId)

// pos esto funciona para sumar stock ligado estrictamente al id del producto del catalogo
export const registrarMercancia = async ({ productoId, nombre_producto, categoria, descripcion_tecnica, volumen, tipoUnidad }) => {
  const cantidad = Number(volumen || 0)
  if ((!productoId && !nombre_producto) || cantidad <= 0) throw new Error('Datos de inventario invalidos')
  await runTransaction(db, async (transaccion) => {
    const catalogoRef = productoId ? doc(db, 'catalogo', productoId) : doc(collection(db, 'catalogo'))
    const inventarioRef = referencia(catalogoRef.id)
    const inventario = await transaccion.get(inventarioRef)
    const catalogo = await transaccion.get(catalogoRef)
    const actual = Number(inventario.data()?.volumen || 0)
    if (productoId && !catalogo.exists()) throw new Error('Producto de catalogo no encontrado')
    const nombre_real = nombre_producto || catalogo.data()?.nombre || ''
    const categoria_real = categoria || catalogo.data()?.categoria || 'Componente de hardware'
    if (!productoId) transaccion.set(catalogoRef, { nombre: nombre_real, categoria: categoria || 'Procesadores', descripcionTecnica: descripcion_tecnica || '', descripcionPrecios: 'Producto ingresado en recepcion', stockVisible: cantidad, precio: 0, imagen: '' })
    transaccion.set(inventarioRef, { productoId: catalogoRef.id, nombreProducto: nombre_real, categoria: categoria_real, tipoUnidad, stockMinimo: 5, volumen: actual + cantidad, fechaIngreso: new Date().toISOString() }, { merge: true })
    if (productoId) transaccion.update(catalogoRef, { stockVisible: actual + cantidad })
  })
}

export const obtenerInventario = async () => {
  const snap = await getDocs(coleccion())
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const escucharInventario = (al_cambiar, al_error) => onSnapshot(coleccion(), (snap) => {
  al_cambiar(snap.docs.map(d => ({ id: d.id, ...d.data() })))
}, al_error)
