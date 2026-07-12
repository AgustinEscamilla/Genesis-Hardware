import { useCerrarSesion } from '../hooks/use_cerrar_sesion'
import { usePedidosEstado } from '../hooks/use_pedidos_estado'
import { actualizarEstadoPedido } from '../services/servicio_flujo_pedidos'
import { RepartidorBarraLateral } from './repartidor_barra_lateral'
import { RepartidorTableroRutas } from './repartidor_tablero_rutas'

// aqui maestro yo muestro el panel del repartidor con la paleta dark del proyecto y cierre de sesion
export function VistaPrincipalRepartidor() {
  const { salir } = useCerrarSesion()
  const { pedidos } = usePedidosEstado('listo_reparto')

  return (
    <div className="min-h-screen bg-fondo text-texto flex">
      <RepartidorBarraLateral />
      <div className="flex-1 flex flex-col">
        <div className="h-14 border-b border-borde bg-panel px-4 flex items-center justify-end">
          <button onClick={salir} className="border border-borde text-xs px-4 py-2 hover:bg-red-700 hover:border-red-700">Cerrar sesion</button>
        </div>
        <RepartidorTableroRutas pedidos={pedidos} alEntregar={(id) => actualizarEstadoPedido(id, 'entregado')} />
      </div>
    </div>
  )
}