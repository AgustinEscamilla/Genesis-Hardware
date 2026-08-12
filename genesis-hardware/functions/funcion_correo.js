import { onCall, HttpsError } from 'firebase-functions/v2/https'
import { defineSecret } from 'firebase-functions/params'
import { db } from './base_firebase.js'

const resend_api_key = defineSecret('RESEND_API_KEY')
const correo_remitente = defineSecret('CORREO_REMITENTE')
const texto_seguro = (valor, maximo = 200) => String(valor ?? '').replace(/[<>]/g, '').slice(0, maximo)

export const enviar_nota_compra = onCall({ secrets: [resend_api_key, correo_remitente] }, async (solicitud) => {
  const correo_cliente = String(solicitud.auth?.token?.email || '').trim().toLowerCase()
  if (!correo_cliente) throw new HttpsError('unauthenticated', 'La cuenta no tiene un correo asociado')
  await db.collection('usuarios').doc(solicitud.auth.uid).set({ correo: correo_cliente }, { merge: true })
  const { pedido = {} } = solicitud.data || {}
  const pedido_bd = await db.collection('pedidos').doc(String(pedido.id || '')).get()
  if (!pedido_bd.exists || pedido_bd.data()?.clienteId !== solicitud.auth.uid) throw new HttpsError('permission-denied', 'No puedes enviar esta nota')
  const items = Array.isArray(pedido.items || pedido.carrito) ? (pedido.items || pedido.carrito) : []
  if (!pedido.id || !items.length) throw new HttpsError('invalid-argument', 'La nota no tiene datos validos')
  const lineas = items.map((item) => `${texto_seguro(item.nombre || 'Articulo')} x${Number(item.cantidad || 0)}: $${(Number(item.precio || 0) * Number(item.cantidad || 0)).toFixed(2)}`)
  const contenido = ['GENESIS HARDWARE', `Orden: ${texto_seguro(pedido.id, 100)}`, `Fecha: ${texto_seguro(pedido.fecha || 'No disponible', 100)}`, '', ...lineas, '', `Total: $${Number(pedido.total || 0).toFixed(2)}`, '', 'Gracias por tu compra. Conserva este ticket para validar tu garantia.'].join('\n')
  const respuesta = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${resend_api_key.value()}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: correo_remitente.value(), to: [correo_cliente], subject: `Mi ticket de compra - Genesis Hardware (${pedido.id})`, text: contenido }) })
  if (!respuesta.ok) throw new HttpsError('internal', 'No se pudo enviar la nota por correo')
  return { enviado: true }
})
