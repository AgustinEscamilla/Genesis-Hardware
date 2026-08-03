import { useEffect } from 'react'
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react'
import { usePagoMercadopago } from '../../hooks/use_pago_mercadopago'
import { TarjetaResumenPago } from './tarjeta_resumen_pago'

const llave_publica = String(import.meta.env.VITE_MP_PUBLIC_KEY || '')
// aqui maestro reviso si la llave publica es de pruebas para avisar que hay que usar una tarjeta de prueba
// (una cuenta de prueba de Mercado Pago tiene credenciales "de produccion" que empiezan con APP_USR-, no TEST-)
const es_llave_de_pruebas = /^(TEST-|APP_USR-)/.test(llave_publica)
let inicializado = false

// esto sirve para orquestar el paso de pago dentro del modal del carrito: cobra la tarjeta con el Payment Brick,
// sin redirigir al cliente al sitio de Mercado Pago (asi tampoco hace falta iniciar sesion con ninguna cuenta de MP)
export function PanelPagoMercadoPago({ total, carrito, zona_logistica, alVolver }) {
  const { estado, error, pagarConTarjeta } = usePagoMercadopago(carrito, zona_logistica)

  useEffect(() => {
    if (inicializado || !llave_publica) return
    initMercadoPago(llave_publica, { locale: 'es-MX' })
    inicializado = true
  }, [])

  const alEnviarTarjeta = async (formData) => {
    await pagarConTarjeta({
      token: formData.token,
      payment_method_id: formData.payment_method_id,
      issuer_id: formData.issuer_id,
      installments: formData.installments,
      payer: formData.payer
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <TarjetaResumenPago total={total} />
      {es_llave_de_pruebas && estado !== 'procesando' && (
        <p className="text-[10px] text-mutado">
          Modo de pruebas: usa una tarjeta de prueba de Mercado Pago, no una tarjeta real.
        </p>
      )}
      {estado !== 'procesando' && (
        <CardPayment
          initialization={{ amount: total }}
          onSubmit={alEnviarTarjeta}
          onError={(e) => console.error('Error del Payment Brick', e)}
        />
      )}
      {estado === 'procesando' && <p className="text-xs text-terciario">Procesando tu pago...</p>}
      {estado === 'error' && <p className="text-xs text-primario">{error}</p>}
      <button onClick={alVolver} className="text-[10px] text-mutado underline self-start">
        Volver al carrito
      </button>
    </div>
  )
}

