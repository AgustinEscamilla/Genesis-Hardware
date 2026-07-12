// aqui maestro yo documente este archivo para mantener trazabilidad
import { collection, doc, getDocs, runTransaction } from 'firebase/firestore'
import { db } from './conexion_firebase'

const colInventario = () => collection(db, 'inventario')

const mapaInventarioPorNombre = async () => {
  const snap = await getDocs(colInventario())
  return snap.docs.reduce((acc, d) => {
    const data = d.data()
    acc[String(data.nombre || '').toLowerCase()] = d.ref
    return acc
  }, {})
}

export const confirmarPedido = async ({ carrito = [], origen = 'empleado' }) => {
  const refs = await mapaInventarioPorNombre()
  const estadoInicial = origen === 'cliente' ? 'iniciacion_pedidos' : 'revision_pedidos'
  return runTransaction(db, async (tx) => {
    for (const item of carrito) {
      const ref = refs[String(item.nombre || '').toLowerCase()]
      if (!ref) throw new Error('Inventario no disponible')
      const snap = await tx.get(ref)
      const actual = Number(snap.data()?.volumen || 0)
      const cantidad = Number(item.cantidad || 0)
      if (cantidad <= 0 || actual < cantidad) throw new Error('Stock insuficiente')
      tx.update(ref, { volumen: actual - cantidad })
    }
    const pedidoRef = doc(collection(db, 'pedidos'))
    tx.set(pedidoRef, { carrito, origen, estado: estadoInicial, fecha: new Date().toISOString() })
    return pedidoRef.id
  })
}