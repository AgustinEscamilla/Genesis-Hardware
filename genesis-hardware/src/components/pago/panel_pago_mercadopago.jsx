import { usePagoMercadopago } from '../../hooks/use_pago_mercadopago'
import { TarjetaResumenPago } from './tarjeta_resumen_pago'
import { BrickPagoMercadoPago } from './brick_pago_mercadopago'

// esto sirve para orquestar el paso de pago dentro del modal del carrito
export function PanelPagoMercadoPago({ total, carrito, zona_logistica, alExito, alVolver }) {
  const { estado, error, alEnviar, alError } = usePagoMercadopago(alExito, carrito, zona_logistica)

  return (
    <div className="flex flex-col gap-3">
      <TarjetaResumenPago total={total} />
      {estado !== 'procesando' && <BrickPagoMercadoPago total={total} alEnviar={alEnviar} alError={alError} />}
      {estado === 'procesando' && <p className="text-xs text-terciario">Procesando pago con Mercado Pago...</p>}
      {estado === 'pendiente' && <p className="text-xs text-terciario">El pago quedó pendiente de confirmación</p>}
      {estado === 'error' && <p className="text-xs text-primario">{error}</p>}
      <button onClick={alVolver} className="text-[10px] text-mutado underline self-start">
        Volver al carrito
      </button>
    </div>
  )
}
