import { usePagoMercadopago } from '../../hooks/use_pago_mercadopago'
import { TarjetaResumenPago } from './tarjeta_resumen_pago'
import { BrickPagoMercadoPago } from './brick_pago_mercadopago'

// aqui maestro reviso si la llave publica es de pruebas para avisar que hay que usar un comprador de prueba
const es_llave_de_pruebas = String(import.meta.env.VITE_MP_PUBLIC_KEY || '').startsWith('TEST-')

// esto sirve para orquestar el paso de pago dentro del modal del carrito
export function PanelPagoMercadoPago({ total, carrito, zona_logistica, alExito, alVolver }) {
  const { estado, error, alEnviar, alError } = usePagoMercadopago(alExito, carrito, zona_logistica)

  return (
    <div className="flex flex-col gap-3">
      <TarjetaResumenPago total={total} />
      {es_llave_de_pruebas && estado !== 'procesando' && (
        <p className="text-[10px] text-mutado">
          Modo de pruebas: usa un comprador y tarjeta de prueba de Mercado Pago, no tu correo ni tarjeta reales.
        </p>
      )}
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
