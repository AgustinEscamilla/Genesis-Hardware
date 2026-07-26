import { Payment } from '@mercadopago/sdk-react'

// pos esto funciona para renderizar el brick oficial de mercado pago con tarjetas y transferencia de prueba
export function BrickPagoMercadoPago({ total, alEnviar }) {
  return (
    <Payment
      initialization={{ amount: total }}
      customization={{ paymentMethods: { creditCard: 'all', debitCard: 'all', bankTransfer: 'all' } }}
      onSubmit={alEnviar}
      onError={(err) => console.error(err)}
    />
  )
}
