import { useState } from 'react'

// esto sirve para manejar el estado del brick y simular la respuesta exitosa de mercado pago sandbox
export function usePagoMercadopago(alExito) {
  const [estado, setEstado] = useState('inicial')
  const [error, setError] = useState('')

  const alEnviar = async ({ formData }) => {
    setEstado('procesando')
    try {
      // aqui puse profe en sandbox tomo el token generado por el brick como pago simulado exitoso
      await new Promise((resolve) => setTimeout(resolve, 800))
      setEstado('exitoso')
      alExito({
        metodoPago: formData?.payment_method_id || 'sandbox',
        pagoReferencia: formData?.token || `sandbox-${Date.now()}`
      })
    } catch (e) {
      setEstado('error')
      setError(String(e?.message || 'No se pudo procesar el pago'))
    }
  }

  return { estado, error, alEnviar }
}
