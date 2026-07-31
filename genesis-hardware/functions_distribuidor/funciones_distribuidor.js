import { getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { onRequest } from 'firebase-functions/v2/https'
import logger_modulo from 'firebase-functions/logger'
import { actualizar_stock_distribuidor } from './servicio_stock_distribuidor.js'
import { distribuidor_api_key, validar_api_key } from './seguridad_distribuidor.js'

if (!getApps().length) initializeApp()
const base_datos = getFirestore()
const registrar_log = logger_modulo.info

const validar_items = (items) => Array.isArray(items) && items.length > 0 && items.every((item) => String(item?.sku_distribuidor || '').trim() && Number.isInteger(Number(item?.cantidad)) && Number(item.cantidad) > 0)
const normalizar_items = (items) => Object.values(items.reduce((acumulado, item) => {
  const sku = String(item.sku_distribuidor).trim()
  acumulado[sku] = { sku_distribuidor: sku, nombre_producto: item.nombre_producto || '', cantidad: (acumulado[sku]?.cantidad || 0) + Number(item.cantidad) }
  return acumulado
}, {}))

export const pedidos_dropship = onRequest({ cors: true, secrets: [distribuidor_api_key] }, async (peticion, respuesta) => {
  if (peticion.method !== 'POST') return respuesta.status(405).json({ error: 'Metodo no permitido' })
  if (!validar_api_key(peticion)) return respuesta.status(401).json({ error: 'No autorizado' })
  const datos = peticion.body || {}
  if (!validar_items(datos.items) || !datos.direccion_entrega) return respuesta.status(400).json({ error: 'Datos de pedido invalidos' })
  const items = normalizar_items(datos.items)
  try {
    const resultado = await base_datos.runTransaction(async (transaccion) => {
      await actualizar_stock_distribuidor(transaccion, base_datos, items)
      const pedido_ref = base_datos.collection('pedidos_distribuidor').doc()
      transaccion.set(pedido_ref, { estado: 'recibido', fecha: new Date().toISOString(), items, direccion_entrega: datos.direccion_entrega })
      return pedido_ref.id
    })
    registrar_log('Pedido dropshipping guardado', { distributor_order_id: resultado })
    return respuesta.status(200).json({ status: 'OK', distributorOrderId: resultado })
  } catch (error) {
    const es_dato = error.message.startsWith('Stock insuficiente') || error.message.startsWith('Producto no encontrado')
    return respuesta.status(es_dato ? 400 : 500).json({ error: es_dato ? error.message : 'No se pudo guardar el pedido' })
  }
})
