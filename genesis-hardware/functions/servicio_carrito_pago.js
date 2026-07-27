import { db } from './base_firebase.js'

export const validar_carrito_pago = async (carrito = []) => {
  if (!Array.isArray(carrito) || !carrito.length) throw new Error('El carrito está vacío')
  const items = []
  let total = 0
  for (const item of carrito) {
    const cantidad = Number(item.cantidad || 0)
    const producto = await db.collection('catalogo').doc(String(item.id)).get()
    const inventario = await db.collection('inventario').doc(String(item.id)).get()
    const datos = producto.data() || {}
    if (!producto.exists || !inventario.exists || cantidad < 1 || Number(inventario.data()?.volumen || 0) < cantidad) throw new Error(`Producto no disponible: ${item.id}`)
    const precio = Number(datos.precio || 0)
    if (!Number.isFinite(precio) || precio <= 0) throw new Error('El producto no tiene un precio válido')
    items.push({ id: String(item.id), nombre: String(datos.nombre || item.nombre || ''), precio, cantidad })
    total += precio * cantidad
  }
  return { items, total: Number(total.toFixed(2)) }
}
