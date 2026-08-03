import { useState } from 'react'
import { iniciarPagoMercadoPago } from '../services/servicio_pago_mercadopago'

// esto sirve para crear la preferencia de Checkout Pro y redirigir al cliente al sitio de Mercado Pago a pagar
export function usePagoMercadopago(carrito, zona_logistica) {
  const [estado, setEstado] = useState('inicial')
  const [error, setError] = useState('')

  const iniciarPago = async () => {
    if (estado === 'procesando' || !carrito.length) return
    setEstado('procesando')
    setError('')
    try {
      const respuesta = await iniciarPagoMercadoPago({ carrito, zona_logistica, idempotencia: crypto.randomUUID() })
      if (!respuesta.url_pago) throw new Error('Mercado Pago no generó la URL de pago')
      window.location.href = respuesta.url_pago
    } catch (e) {
      setEstado('error')
      setError(String(e?.message || 'No se pudo iniciar el pago'))
    }
  }

  return { estado, error, iniciarPago }
}
