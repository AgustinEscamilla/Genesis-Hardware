import { Payment } from '@mercadopago/sdk-react'

export function BrickPagoMercadoPago({ total, alEnviar, alError }) {
  const paymentMethods = { creditCard: 'all', debitCard: 'all', prepaidCard: 'all' }
  if (import.meta.env.VITE_MP_HABILITAR_TRANSFERENCIA === 'true') paymentMethods.bankTransfer = 'all'
  return <Payment initialization={{ amount: total }} locale="es-MX" customization={{ paymentMethods }} onSubmit={alEnviar} onError={alError} />
}
