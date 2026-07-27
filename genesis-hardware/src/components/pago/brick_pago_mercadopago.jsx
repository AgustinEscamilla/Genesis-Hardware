import { Payment } from '@mercadopago/sdk-react'

// pos esto funciona para renderizar el brick oficial de mercado pago con tarjetas y transferencia
export function BrickPagoMercadoPago({ total, alEnviar, alError }) {
  return (
    <Payment
      initialization={{ amount: total }}
      locale="es-MX"
      customization={{ paymentMethods: { creditCard: 'all', debitCard: 'all', prepaidCard: 'all', bankTransfer: 'all' } }}
      onSubmit={alEnviar}
      onError={alError}
    />
  )
}
