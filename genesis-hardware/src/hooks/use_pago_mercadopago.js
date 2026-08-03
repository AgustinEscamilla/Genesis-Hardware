import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { crearPagoTarjetaMercadoPago } from '../services/servicio_pago_mercadopago'

// esto sirve para cobrar la tarjeta directo con el Payment Brick (Checkout API): el cliente nunca sale de nuestro sitio
// asi evitamos el requisito de "cuenta de prueba comprador" logueada que exige el Checkout Pro alojado
export function usePagoMercadopago(carrito, zona_logistica) {
  const [estado, setEstado] = useState('inicial')
  const [error, setError] = useState('')
  const navegar = useNavigate()

  const pagarConTarjeta = async (tarjeta) => {
    if (estado === 'procesando' || !carrito.length) return
    setEstado('procesando')
    setError('')
    try {
      const respuesta = await crearPagoTarjetaMercadoPago({ carrito, zona_logistica, idempotencia: crypto.randomUUID(), tarjeta })
      if (respuesta.estado_pago === 'rejected') throw new Error('Mercado Pago rechazó el pago, intenta con otra tarjeta')
      navegar(`/clientes/pago/retorno?referencia=${encodeURIComponent(respuesta.referencia)}`)
    } catch (e) {
      setEstado('error')
      setError(String(e?.message || 'No se pudo procesar el pago'))
    }
  }

  return { estado, error, pagarConTarjeta }
}
