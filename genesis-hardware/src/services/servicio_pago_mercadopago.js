import { initMercadoPago } from '@mercadopago/sdk-react'
import { auth, configuracionFirebase } from './conexion_firebase'

// aqui maestro yo inicializo el sdk de mercado pago con la llave publica de prueba
export const inicializarMercadoPago = () => {
  const llave = import.meta.env.VITE_MP_PUBLIC_KEY
  if (llave) initMercadoPago(llave, { locale: 'es-MX' })
}

const url_pago = import.meta.env.VITE_MP_PAYMENT_FUNCTION_URL || `https://us-central1-${configuracionFirebase.projectId}.cloudfunctions.net/procesar_pago`

export const procesarPagoMercadoPago = async ({ datos_pago, carrito, zona_logistica, idempotencia }) => {
  const usuario = auth.currentUser
  if (!usuario) throw new Error('La sesión del cliente no está disponible')
  const token = await usuario.getIdToken()
  const respuesta = await fetch(url_pago, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ datos_pago, carrito, zona_logistica, idempotencia })
  })
  const datos = await respuesta.json().catch(() => ({}))
  if (!respuesta.ok) throw new Error(datos.mensaje || 'Mercado Pago no pudo procesar el pago')
  return datos
}
