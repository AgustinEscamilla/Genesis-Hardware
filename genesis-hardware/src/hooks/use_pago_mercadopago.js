import { useState } from 'react'
import { procesarPagoMercadoPago } from '../services/servicio_pago_mercadopago'

// esto sirve para manejar el estado real del brick y comunicar el pago aprobado o pendiente
export function usePagoMercadopago(alExito, carrito, zona_logistica) {
  const [estado, setEstado] = useState('inicial')
  const [error, setError] = useState('')

  const alEnviar = async (datos_formulario) => {
    if (estado === 'procesando') return
    setEstado('procesando')
    setError('')
    try {
      const respuesta = await procesarPagoMercadoPago({ datos_pago: datos_formulario, carrito, zona_logistica, idempotencia: crypto.randomUUID() })
      const estado_pago = respuesta.estado_pago
      if (!['approved', 'pending', 'in_process'].includes(estado_pago)) throw new Error('Mercado Pago rechazó el pago')
      setEstado(estado_pago === 'approved' ? 'exitoso' : 'pendiente')
      alExito({ estadoPago: estado_pago, metodoPago: respuesta.metodo_pago, pagoReferencia: respuesta.pago_id, pedidoId: respuesta.pedido_id, urlPago: respuesta.url_pago })
    } catch (e) {
      setEstado('error')
      setError(String(e?.message || 'No se pudo procesar el pago'))
    }
  }

  const alError = () => { setEstado('error'); setError('Revisa los datos del medio de pago') }

  return { estado, error, alEnviar, alError }
}
