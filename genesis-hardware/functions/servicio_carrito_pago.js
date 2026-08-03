import { db } from './base_firebase.js'

const buscar_producto = async (item) => {
  const directo = await db.collection('catalogo').doc(String(item.id)).get()
  if (directo.exists) return directo
  const consulta = await db.collection('catalogo').where('nombre', '==', String(item.nombre || '')).limit(1).get()
  return consulta.docs[0] || null
}

export const validar_carrito_pago = async (carrito = []) => {
  if (!Array.isArray(carrito) || !carrito.length) throw new Error('El carrito está vacío')
  const items = []
  let total = 0
  for (const item of carrito) {
    const cantidad = Number(item.cantidad || 0)
    const producto = await buscar_producto(item)
    const datos = producto?.data() || {}
    const inventario = producto ? await db.collection('inventario').doc(producto.id).get() : null
    const stock = inventario?.exists ? Number(inventario.data()?.volumen || 0) : Number(datos.stockVisible || 0)
    if (!producto || cantidad < 1 || stock < cantidad) throw new Error(`Producto no disponible: ${item.nombre || item.id}`)
    const precio = Number(datos.precio || 0)
    if (!Number.isFinite(precio) || precio <= 0) throw new Error('El producto no tiene un precio válido')
    items.push({ id: producto.id, nombre: String(datos.nombre || item.nombre || ''), precio, cantidad })
    total += precio * cantidad
  }
  return { items, total: Number(total.toFixed(2)) }
}
