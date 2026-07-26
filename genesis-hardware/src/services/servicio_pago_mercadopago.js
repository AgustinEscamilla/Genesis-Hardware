import { initMercadoPago } from '@mercadopago/sdk-react'

// aqui maestro yo inicializo el sdk de mercado pago con la llave publica de prueba
export const inicializarMercadoPago = () => {
  const llave = import.meta.env.VITE_MP_PUBLIC_KEY
  if (llave) initMercadoPago(llave, { locale: 'es-MX' })
}
