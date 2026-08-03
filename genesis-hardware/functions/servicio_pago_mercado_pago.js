import { defineSecret } from 'firebase-functions/params'

export const mercado_pago_access_token = defineSecret('MERCADO_PAGO_ACCESS_TOKEN')
const url_api = 'https://api.mercadopago.com/v1/payments'
const obtener_token = () => {
  const token = String(mercado_pago_access_token.value() || '').trim()
  if (!/^(TEST-|APP_USR-)/.test(token)) throw new Error('El Access Token de Mercado Pago no es válido')
  return token
}

const llamar_api = async (url, opciones) => {
  const respuesta = await fetch(url, opciones)
  const datos = await respuesta.json().catch(() => ({}))
  if (!respuesta.ok) {
    const causas = Array.isArray(datos.cause) ? datos.cause.map((c) => `${c.code}: ${c.description}`).join(' | ') : ''
    console.error('Mercado Pago rechazó la solicitud', JSON.stringify(datos))
    throw new Error(causas || datos.message || 'Mercado Pago rechazó la solicitud')
  }
  return datos
}

export const crear_pago = async ({ formulario, total, email, idempotencia, url_webhook }) => {
  const cuerpo = { transaction_amount: total, description: 'Compra Genesis Hardware', payment_method_id: formulario.payment_method_id, notification_url: url_webhook, payer: { ...(formulario.payer || {}), email: formulario.payer?.email || email } }
  if (formulario.token) cuerpo.token = formulario.token
  if (formulario.installments) cuerpo.installments = Number(formulario.installments)
  if (formulario.issuer_id) cuerpo.issuer_id = formulario.issuer_id
  return llamar_api(url_api, { method: 'POST', headers: { Authorization: `Bearer ${obtener_token()}`, 'Content-Type': 'application/json', 'X-Idempotency-Key': idempotencia }, body: JSON.stringify(cuerpo) })
}

export const consultar_pago = (pago_id) => llamar_api(`${url_api}/${pago_id}`, { headers: { Authorization: `Bearer ${obtener_token()}` }, method: 'GET' })
