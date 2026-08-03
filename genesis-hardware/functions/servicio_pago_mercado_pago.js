import { defineSecret } from 'firebase-functions/params'

export const mercado_pago_access_token = defineSecret('MERCADO_PAGO_ACCESS_TOKEN')
const url_pagos = 'https://api.mercadopago.com/v1/payments'
const url_preferencias = 'https://api.mercadopago.com/checkout/preferences'
const obtener_token = () => {
  const token = String(mercado_pago_access_token.value() || '').trim()
  if (!/^(TEST-|APP_USR-)/.test(token)) throw new Error('El Access Token de Mercado Pago no es valido')
  return token
}

const llamar_api = async (url, opciones) => {
  const respuesta = await fetch(url, opciones)
  const datos = await respuesta.json().catch(() => ({}))
  if (!respuesta.ok) {
    const causas = Array.isArray(datos.cause) ? datos.cause.map((c) => `${c.code}: ${c.description}`).join(' | ') : ''
    console.error('Mercado Pago rechazo la solicitud', JSON.stringify(datos))
    // "internal_error" sin causa suele indicar que la cuenta de Mercado Pago no tiene
    // activado el producto Checkout API (falta completar el perfil de negocio en el panel)
    if (datos.message === 'internal_error' && !causas) {
      throw new Error('Mercado Pago no pudo procesar el pago por una configuracion pendiente en la cuenta del vendedor. Contacta al soporte del sitio')
    }
    throw new Error(causas || datos.message || 'Mercado Pago rechazo la solicitud')
  }
  return datos
}

// aqui maestro creo la preferencia de Checkout Pro: el cliente paga en el sitio de Mercado Pago y regresa a nuestra tienda
export const crear_preferencia = async ({ items, email, referencia, url_webhook, url_retorno }) => {
  const token_auth = 'Bearer ' + obtener_token()
  const cuerpo = {
    items: items.map((item) => ({ title: item.nombre, quantity: Number(item.cantidad), unit_price: Number(item.precio), currency_id: 'MXN' })),
    payer: email ? { email } : undefined,
    external_reference: referencia,
    notification_url: url_webhook,
    back_urls: { success: url_retorno, pending: url_retorno, failure: url_retorno },
    auto_return: 'approved',
    statement_descriptor: 'GENESIS HARDWARE'
  }
  console.log('Creando preferencia de Checkout Pro', JSON.stringify({ referencia, total_items: items.length }))
  return llamar_api(url_preferencias, { method: 'POST', headers: { Authorization: token_auth, 'Content-Type': 'application/json' }, body: JSON.stringify(cuerpo) })
}

export const consultar_pago = (pago_id) => {
  const token_auth = 'Bearer ' + obtener_token()
  return llamar_api(`${url_pagos}/${pago_id}`, { headers: { Authorization: token_auth }, method: 'GET' })
}