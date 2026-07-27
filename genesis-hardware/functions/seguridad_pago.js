import { auth_admin } from './base_firebase.js'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { Buffer } from 'node:buffer'
import { defineSecret } from 'firebase-functions/params'

export const mercado_pago_webhook_secret = defineSecret('MERCADO_PAGO_WEBHOOK_SECRET')

export const autenticar_usuario = async (peticion) => {
  const encabezado = peticion.headers.authorization || ''
  const token = encabezado.startsWith('Bearer ') ? encabezado.slice(7) : ''
  if (!token) throw new Error('Sesión de pago no autorizada')
  return auth_admin.verifyIdToken(token)
}

export const validar_firma_webhook = (peticion, pago_id) => {
  const firma = String(peticion.headers['x-signature'] || '')
  const solicitud = String(peticion.headers['x-request-id'] || '')
  const partes = Object.fromEntries(firma.split(',').map(item => item.split('=')))
  if (!partes.ts || !partes.v1) return false
  const manifiesto = `id:${pago_id};request-id:${solicitud};ts:${partes.ts};`
  const esperado = createHmac('sha256', mercado_pago_webhook_secret.value()).update(manifiesto).digest('hex')
  if (esperado.length !== partes.v1.length) return false
  return timingSafeEqual(Buffer.from(esperado), Buffer.from(partes.v1))
}
