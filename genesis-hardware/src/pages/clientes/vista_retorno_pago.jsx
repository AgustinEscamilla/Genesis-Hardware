import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCarritoGlobal } from '../../hooks/use_carrito_global'
import { consultarEstadoPagoMercadoPago } from '../../services/servicio_pago_mercadopago'

const ESTADOS_FINALES_OK = ['approved']
const ESTADOS_FINALES_MAL = ['rejected', 'cancelled']

// aqui maestro yo recibo al cliente cuando regresa del sitio de Mercado Pago y consulto el estado real de su pago
export function VistaRetornoPago() {
  const [busqueda] = useSearchParams()
  const navegar = useNavigate()
  const { limpiar } = useCarritoGlobal()
  const referencia = busqueda.get('referencia') || ''
  const [estado, setEstado] = useState(() => referencia ? 'consultando' : 'error')
  const [pedidoId, setPedidoId] = useState('')
  const [mensaje, setMensaje] = useState(() => referencia ? '' : 'No se encontró la referencia del pago')
  const limpiado = useRef(false)

  useEffect(() => {
    if (!referencia) return undefined
    let intentos = 0
    let cancelado = false
    const consultar = async () => {
      try {
        const datos = await consultarEstadoPagoMercadoPago(referencia)
        if (cancelado) return
        if (ESTADOS_FINALES_OK.includes(datos.estado_pago)) {
          setEstado('aprobado'); setPedidoId(datos.pedido_id || '')
          if (!limpiado.current) { limpiar(); limpiado.current = true }
          return
        }
        if (ESTADOS_FINALES_MAL.includes(datos.estado_pago)) {
          setEstado('rechazado'); setMensaje('Mercado Pago no aprobó el pago, tu carrito sigue disponible para reintentar')
          return
        }
        intentos += 1
        if (intentos >= 10) { setEstado('pendiente'); setMensaje('Tu pago está pendiente de confirmación, te avisaremos cuando se acredite'); return }
        setTimeout(consultar, 2000)
      } catch (error) {
        if (cancelado) return
        setEstado('error'); setMensaje(String(error?.message || 'No se pudo consultar el estado del pago'))
      }
    }
    consultar()
    return () => { cancelado = true }
  }, [referencia, limpiar])

  return (
    <div className="min-h-screen flex items-center justify-center bg-fondo p-4">
      <div className="max-w-md w-full rounded-xl border border-borde bg-panel p-6 text-center flex flex-col gap-3">
        {estado === 'consultando' && (
          <>
            <p className="text-texto font-bold">Confirmando tu pago...</p>
            <p className="text-xs text-mutado">Esto puede tardar unos segundos</p>
          </>
        )}
        {estado === 'aprobado' && (
          <>
            <p className="text-primario font-bold text-lg">¡Pedido confirmado!</p>
            {pedidoId && <p className="text-xs text-mutado">Folio {String(pedidoId).slice(0, 10)}</p>}
            <p className="text-xs text-mutado">Tu pedido quedó pendiente de recolección</p>
          </>
        )}
        {estado === 'pendiente' && (
          <>
            <p className="text-texto font-bold">Pago pendiente</p>
            <p className="text-xs text-mutado">{mensaje}</p>
          </>
        )}
        {(estado === 'rechazado' || estado === 'error') && (
          <>
            <p className="text-primario font-bold">No se pudo completar el pago</p>
            <p className="text-xs text-mutado">{mensaje}</p>
          </>
        )}
        <button onClick={() => navegar('/clientes')} className="mt-2 border border-primario py-2 text-xs font-bold text-primario hover:bg-primario hover:text-fondo">
          Ir a mi cuenta
        </button>
      </div>
    </div>
  )
}

export default VistaRetornoPago
