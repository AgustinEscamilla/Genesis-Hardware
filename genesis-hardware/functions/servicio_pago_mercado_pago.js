import { defineSecret } from 'firebase-functions/params'

export const mercado_pago_access_token = defineSecret('MERCADO_PAGO_ACCESS_TOKEN')
const url_api = 'https://api.mercadopago.com/v1/payments'

const llamar_api = async (url, opciones) => {
  const respuesta = await fetch(url, opciones)
  const datos = await respuesta.json().catch(() => ({}))
  if (!respuesta.ok) throw new Error(datos.message || datos.cause?.[0]?.description || 'Mercado Pago rechazó la solicitud')
  return datos
}

export const crear_pago = async ({ formulario, total, email, idempotencia, url_webhook }) => {
  const cuerpo = { transaction_amount: total, description: 'Compra Genesis Hardware', payment_method_id: formulario.payment_method_id, notification_url: url_webhook, payer: { ...(formulario.payer || {}), email: formulario.payer?.email || email } }
  if (formulario.token) cuerpo.token = formulario.token
  if (formulario.installments) cuerpo.installments = Number(formulario.installments)
  if (formulario.issuer_id) cuerpo.issuer_id = formulario.issuer_id
  return llamar_api(url_api, { method: 'POST', headers: { Authorization: `Bearer ${mercado_pago_access_token.value()}`, 'Content-Type': 'application/json', 'X-Idempotency-Key': idempotencia }, body: JSON.stringify(cuerpo) })
}

export const consultar_pago = (pago_id) => llamar_api(`${url_api}/${pago_id}`, { headers: { Authorization: `Bearer ${mercado_pago_access_token.value()}` }, method: 'GET' })
