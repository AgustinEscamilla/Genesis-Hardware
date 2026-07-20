// aqui maestro yo documente este archivo para mantener trazabilidad
import { useCerrarSesion } from '../../hooks/use_cerrar_sesion'
import { usePedidosEstado } from '../../hooks/use_pedidos_estado'
import { actualizarEstadoPedido, ESTADOS_PEDIDO } from '../../services/servicio_flujo_pedidos'
import { ListaPedidosEstado } from './lista_pedidos_estado'
import { Boton } from '../../components/boton'

export function VistaPrincipal() {
  const { salir } = useCerrarSesion()
  const { pedidos: recibidos } = usePedidosEstado(ESTADOS_PEDIDO.RECIBIDO)
  const { pedidos: enEmpaque } = usePedidosEstado(ESTADOS_PEDIDO.EN_EMPAQUE)
  const { pedidos: listosDespacho } = usePedidosEstado(ESTADOS_PEDIDO.LISTO_DESPACHO)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="text-3xl font-bold text-texto mb-1">Flujo de empaque</h2>
          <p className="text-mutado text-sm tracking-wide">RECIBIDO EN EMPAQUE Y LISTO PARA DESPACHO</p>
        </div>
        <Boton variante="contorno" className="px-4 py-2 text-xs uppercase tracking-wide" onClick={salir}>
          Cerrar sesion
        </Boton>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <ListaPedidosEstado
          titulo="Recibido"
          pedidos={recibidos}
          accion={(pedido) => actualizarEstadoPedido(pedido, ESTADOS_PEDIDO.EN_EMPAQUE)}
          textoAccion="Iniciar empaque"
        />
        <ListaPedidosEstado
          titulo="En empaque"
          pedidos={enEmpaque}
          accion={(pedido) => actualizarEstadoPedido(pedido, ESTADOS_PEDIDO.LISTO_DESPACHO)}
          textoAccion="Marcar listo para despacho"
        />
        <ListaPedidosEstado
          titulo="Listo para despacho"
          pedidos={listosDespacho}
          accion={null}
          textoAccion="Esperando repartidor"
        />
      </div>
    </div>
  )
}