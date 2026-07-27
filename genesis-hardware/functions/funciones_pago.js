import { randomUUID } from 'node:crypto'
import { env } from 'node:process'
import { onRequest } from 'firebase-functions/v2/https'
import { autenticar_usuario, validar_firma_webhook, mercado_pago_webhook_secret } from './seguridad_pago.js'
import { crear_pago, consultar_pago, mercado_pago_access_token } from './servicio_pago_mercado_pago.js'
import { validar_carrito_pago } from './servicio_carrito_pago.js'
import { crear_pedido_pagado } from './servicio_ordenes_pago.js'
import { guardar_pago_pendiente, obtener_pago_pendiente } from './servicio_pagos_pendientes.js'

const configuracion = { region: 'us-central1', cors: true, secrets: [mercado_pago_access_token, mercado_pago_webhook_secret] }
const datos_respuesta = (pago, pedido_id = '') => ({ estado_pago: pago.status, pago_id: String(pago.id), pedido_id, metodo_pago: pago.payment_method_id, url_pago: pago.transaction_details?.external_resource_url || '' })

export const procesar_pago = onRequest(configuracion, async (peticion, respuesta) => {
  if (peticion.method !== 'POST') return respuesta.status(405).json({ mensaje: 'Método no permitido' })
  try {
    const usuario = await autenticar_usuario(peticion)
    const datos = peticion.body || {}
    const compra = await validar_carrito_pago(datos.carrito)
    const url_webhook = `https://us-central1-${env.GCLOUD_PROJECT || 'genesis-hardware'}.cloudfunctions.net/webhook_pago`
    const pago = await crear_pago({ formulario: datos.datos_pago?.formData || {}, total: compra.total, email: usuario.email, idempotencia: datos.idempotencia || randomUUID(), url_webhook })
    const pendiente = { ...datos_respuesta(pago), usuario_id: usuario.uid, carrito: compra.items, total: compra.total, zona_logistica: datos.zona_logistica || 'sin_zona' }
    await guardar_pago_pendiente(pendiente)
    let pedido_id = ''
    if (pago.status === 'approved') pedido_id = await crear_pedido_pagado({ ...pendiente, pago_id: String(pago.id), metodo_pago: pago.payment_method_id })
    await guardar_pago_pendiente({ ...pendiente, pedido_id })
    return respuesta.json(datos_respuesta(pago, pedido_id))
  } catch (error) { return respuesta.status(400).json({ mensaje: error.message || 'No se pudo procesar el pago' }) }
})

export const webhook_pago = onRequest(configuracion, async (peticion, respuesta) => {
  try {
    const pago_id = String(peticion.body?.data?.id || peticion.query['data.id'] || '')
    if (!pago_id) return respuesta.status(200).json({ recibido: true })
    if (!validar_firma_webhook(peticion, pago_id)) return respuesta.status(401).json({ mensaje: 'Firma de webhook inválida' })
    const pendiente = await obtener_pago_pendiente(pago_id)
    if (!pendiente) return respuesta.status(200).json({ recibido: true })
    const pago = await consultar_pago(pago_id)
    let pedido_id = pendiente.pedido_id || ''
    if (pago.status === 'approved' && !pedido_id) pedido_id = await crear_pedido_pagado({ ...pendiente, pago_id, metodo_pago: pago.payment_method_id })
    await guardar_pago_pendiente({ ...pendiente, ...datos_respuesta(pago, pedido_id), estado_pago: pago.status })
    return respuesta.status(200).json({ recibido: true })
  } catch (error) { return respuesta.status(500).json({ mensaje: error.message || 'No se pudo actualizar el pago' }) }
})
