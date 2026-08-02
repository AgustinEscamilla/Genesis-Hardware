import { onRequest } from 'firebase-functions/v2/https'
import { db } from './base_firebase.js'

const adaptar_producto = (doc) => {
  const datos = doc.data()
  return { id: doc.id, sku: datos.sku || doc.id, nombre: datos.nombre || '', marca: datos.marca || '', precio: Number(datos.precio || 0), stock: Number(datos.stock ?? datos.stockVisible ?? 0), imagen_url: datos.imagen_url || datos.imagen || '', calificacion: Number(datos.calificacion || 0), opiniones_count: Number(datos.opiniones_count || 0), categoria: datos.categoria || '', descripcion_breve: datos.descripcion_breve || datos.descripcionPrecios || '', descripcion_larga: datos.descripcion_larga || datos.descripcionTecnica || '', especificaciones: datos.especificaciones || {} }
}

const coincide = (producto, datos) => {
  const texto = `${producto.nombre} ${producto.marca} ${producto.sku}`.toLowerCase()
  const minimo = datos.minimo ? Number(datos.minimo) : 0
  const maximo = datos.maximo ? Number(datos.maximo) : Infinity
  return (!datos.busqueda || texto.includes(String(datos.busqueda).toLowerCase())) && (!datos.categoria || producto.categoria === datos.categoria) && (!datos.marca || producto.marca === datos.marca) && producto.precio >= minimo && producto.precio <= maximo
}

export const api_productos = onRequest({ region: 'us-central1', cors: true }, async (peticion, respuesta) => {
  if (peticion.method !== 'GET') return respuesta.status(405).json({ error: 'Método no permitido' })
  try {
    const instantanea = await db.collection('catalogo').get()
    const datos = peticion.query
    const productos = instantanea.docs.map(adaptar_producto).filter((producto) => coincide(producto, datos))
    const orden = datos.orden === 'mayor' ? -1 : 1
    if (datos.orden === 'menor' || datos.orden === 'mayor') productos.sort((a, b) => orden * (a.precio - b.precio))
    return respuesta.json({ productos, total: productos.length })
  } catch (error) { return respuesta.status(500).json({ error: error.message }) }
})

export const api_producto = onRequest({ region: 'us-central1', cors: true }, async (peticion, respuesta) => {
  if (peticion.method !== 'GET') return respuesta.status(405).json({ error: 'Método no permitido' })
  try { const documento = await db.collection('catalogo').doc(String(peticion.query.id || peticion.path.split('/').pop())).get(); if (!documento.exists) return respuesta.status(404).json({ error: 'Producto no encontrado' }); return respuesta.json(adaptar_producto(documento)) } catch (error) { return respuesta.status(500).json({ error: error.message }) }
})
