import { randomUUID } from 'node:crypto'
import { env } from 'node:process'
import { onRequest } from 'firebase-functions/v2/https'
import { db } from './base_firebase.js'
import { autenticar_usuario, validar_firma_webhook, mercado_pago_webhook_secret } from './seguridad_pago.js'
import { crear_preferencia, crear_pago, consultar_pago, mercado_pago_access_token } from './servicio_pago_mercado_pago.js'
import { validar_carrito_pago } from './servicio_carrito_pago.js'
import { crear_pedido_pagado } from './servicio_ordenes_pago.js'
import { guardar_pago_pendiente, obtener_pago_pendiente } from './servicio_pagos_pendientes.js'

const configuracion = { region: 'us-central1', cors: true, secrets: [mercado_pago_access_token, mercado_pago_webhook_secret] }
const url_sitio = () => env.URL_SITIO || 'https://genesis-hardware.web.app'
const datos_respuesta = (pendiente) => ({ estado_pago: pendiente.estado_pago || 'pendiente', pago_id: pendiente.pago_id || '', pedido_id: pendiente.pedido_id || '', metodo_pago: pendiente.metodo_pago || '', referencia: pendiente.referencia || pendiente.id || '' })

// aqui maestro yo creo la preferencia de Checkout Pro: el cliente es redirigido al sitio de Mercado Pago para pagar
export const procesar_pago = onRequest(configuracion, async (peticion, respuesta) => {
  if (peticion.method !== 'POST') return respuesta.status(405).json({ mensaje: 'Metodo no permitido' })
  try {
    const usuario = await autenticar_usuario(peticion)
    const perfil = await db.collection('usuarios').doc(usuario.uid).get()
    const direccion = String(perfil.data()?.direccionVivienda || '').trim()
    if (direccion.length < 15) throw new Error('Registra una direccion completa antes de comprar')
    const datos = peticion.body || {}
    const compra = await validar_carrito_pago(datos.carrito)
    const referencia = datos.idempotencia || randomUUID()
    const url_webhook = `https://us-central1-${env.GCLOUD_PROJECT || 'genesis-hardware'}.cloudfunctions.net/webhook_pago`
    const url_retorno = `${url_sitio()}/clientes/pago/retorno?referencia=${referencia}`
    const preferencia = await crear_preferencia({ items: compra.items, email: usuario.email, referencia, url_webhook, url_retorno })
    const pendiente = { pago_id: referencia, referencia, preferencia_id: preferencia.id, estado_pago: 'pendiente', usuario_id: usuario.uid, carrito: compra.items, total: compra.total, zona_logistica: 'campeche' }
    await guardar_pago_pendiente(pendiente)
    // Mercado Pago solo entrega sandbox_init_point cuando la cuenta (o el token) esta en modo de pruebas,
    // sea con un Access Token TEST- o con las credenciales "de produccion" de una cuenta de prueba (APP_USR-)
    const url_pago = preferencia.sandbox_init_point || preferencia.init_point
    return respuesta.json({ url_pago, referencia })
  } catch (error) { return respuesta.status(400).json({ mensaje: error.message || 'No se pudo iniciar el pago' }) }
})

// aqui maestro yo proceso el pago con Checkout API: el cliente teclea su tarjeta en nuestro sitio (Payment Brick) y nunca sale a mercadopago.com
export const procesar_pago_tarjeta = onRequest(configuracion, async (peticion, respuesta) => {
  if (peticion.method !== 'POST') return respuesta.status(405).json({ mensaje: 'Metodo no permitido' })
  try {
    const usuario = await autenticar_usuario(peticion)
    const perfil = await db.collection('usuarios').doc(usuario.uid).get()
    const direccion = String(perfil.data()?.direccionVivienda || '').trim()
    if (direccion.length < 15) throw new Error('Registra una direccion completa antes de comprar')
    const datos = peticion.body || {}
    const compra = await validar_carrito_pago(datos.carrito)
    const referencia = datos.idempotencia || randomUUID()
    const url_webhook = `https://us-central1-${env.GCLOUD_PROJECT || 'genesis-hardware'}.cloudfunctions.net/webhook_pago`
    const tarjeta = datos.tarjeta || {}
    if (!tarjeta.token) throw new Error('Faltan los datos de la tarjeta')
    const pago = await crear_pago({
      token: tarjeta.token,
      payment_method_id: tarjeta.payment_method_id,
      issuer_id: tarjeta.issuer_id,
      installments: tarjeta.installments,
      transaction_amount: compra.total,
      payer: { email: tarjeta.payer?.email || usuario.email, identification: tarjeta.payer?.identification },
      referencia,
      descripcion: `Genesis Hardware - ${compra.items.length} producto(s)`,
      url_webhook
    })
    const pendiente = { pago_id: String(pago.id), referencia, estado_pago: pago.status, usuario_id: usuario.uid, carrito: compra.items, total: compra.total, zona_logistica: 'campeche', metodo_pago: pago.payment_method_id }
    await guardar_pago_pendiente(pendiente)
    let pedido_id = ''
    if (pago.status === 'approved') {
      pedido_id = await crear_pedido_pagado({ usuario_id: usuario.uid, carrito: compra.items, total: compra.total, zona_logistica: 'campeche', referencia, pago_id: String(pago.id), metodo_pago: pago.payment_method_id })
      await guardar_pago_pendiente({ referencia, pedido_id })
    }
    return respuesta.json({ estado_pago: pago.status, detalle_estado: pago.status_detail, pago_id: String(pago.id), pedido_id, referencia })
  } catch (error) { return respuesta.status(400).json({ mensaje: error.message || 'No se pudo procesar el pago' }) }
})

// aqui maestro yo dejo que el cliente autenticado consulte el estado de su pago mientras regresa de Mercado Pago
export const consultar_estado_pago = onRequest(configuracion, async (peticion, respuesta) => {
  if (peticion.method !== 'GET') return respuesta.status(405).json({ mensaje: 'Metodo no permitido' })
  try {
    const usuario = await autenticar_usuario(peticion)
    const referencia = String(peticion.query.referencia || '')
    if (!referencia) return respuesta.status(400).json({ mensaje: 'Falta la referencia del pago' })
    const pendiente = await obtener_pago_pendiente(referencia)
    if (!pendiente || pendiente.usuario_id !== usuario.uid) return respuesta.status(404).json({ mensaje: 'Pago no encontrado' })
    return respuesta.json(datos_respuesta(pendiente))
  } catch (error) { return respuesta.status(400).json({ mensaje: error.message || 'No se pudo consultar el pago' }) }
})

export const webhook_pago = onRequest(configuracion, async (peticion, respuesta) => {
  try {
    const pago_id = String(peticion.body?.data?.id || peticion.query['data.id'] || '')
    if (!pago_id) return respuesta.status(200).json({ recibido: true })
    if (!validar_firma_webhook(peticion, pago_id)) return respuesta.status(401).json({ mensaje: 'Firma de webhook invalida' })
    const pago = await consultar_pago(pago_id)
    const referencia = String(pago.external_reference || '')
    if (!referencia) return respuesta.status(200).json({ recibido: true })
    const pendiente = await obtener_pago_pendiente(referencia)
    if (!pendiente) return respuesta.status(200).json({ recibido: true })
    let pedido_id = pendiente.pedido_id || ''
    if (pago.status === 'approved' && !pedido_id) pedido_id = await crear_pedido_pagado({ usuario_id: pendiente.usuario_id, carrito: pendiente.carrito, total: pendiente.total, zona_logistica: pendiente.zona_logistica, referencia, pago_id: String(pago.id), metodo_pago: pago.payment_method_id })
    await guardar_pago_pendiente({ referencia, pago_id: String(pago.id), pedido_id, estado_pago: pago.status, metodo_pago: pago.payment_method_id })
    return respuesta.status(200).json({ recibido: true })
  } catch (error) { return respuesta.status(500).json({ mensaje: error.message || 'No se pudo actualizar el pago' }) }
})
