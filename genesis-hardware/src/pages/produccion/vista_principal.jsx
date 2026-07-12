// aqui maestro yo documente este archivo para mantener trazabilidad
import { useCerrarSesion } from '../../hooks/use_cerrar_sesion'
import { usePedidosEstado } from '../../hooks/use_pedidos_estado'
import { actualizarEstadoPedido } from '../../services/servicio_flujo_pedidos'
import { ListaPedidosEstado } from './lista_pedidos_estado'
import { Boton } from '../../components/boton'

export function VistaPrincipal() {
  const { salir } = useCerrarSesion()
  const { pedidos: iniciacion } = usePedidosEstado('iniciacion_pedidos')
  const { pedidos: revision } = usePedidosEstado('revision_pedidos')

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="text-3xl font-bold text-texto mb-1">Iniciacion de pedidos</h2>
          <p className="text-mutado text-sm tracking-wide">EMPAQUE Y REVISION OPERATIVA</p>
        </div>
        <Boton variante="contorno" className="px-4 py-2 text-xs uppercase tracking-wide" onClick={salir}>
          Cerrar sesion
        </Boton>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ListaPedidosEstado
          titulo="Iniciacion de pedidos"
          pedidos={iniciacion}
          accion={(id) => actualizarEstadoPedido(id, 'revision_pedidos')}
          textoAccion="Marcar empaquetado"
        />
        <ListaPedidosEstado
          titulo="Revision de pedidos"
          pedidos={revision}
          accion={(id) => actualizarEstadoPedido(id, 'listo_reparto')}
          textoAccion="Confirmar revision"
        />
      </div>
    </div>
  )
}