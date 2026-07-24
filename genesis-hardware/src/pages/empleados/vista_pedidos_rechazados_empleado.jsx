import { usePedidosRechazados } from '../../hooks/use_pedidos_rechazados'
import { ListaPedidosRechazados } from './lista_pedidos_rechazados'

// esto sirve para gestionar los pedidos que el cliente rechazo en la entrega
export function VistaPedidosRechazadosEmpleado() {
  const { pedidos, reprocesar } = usePedidosRechazados()

  return (
    <div className="min-h-screen bg-fondo p-6 text-texto">
      <div className="bg-panel border border-borde p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-1">Pedidos rechazados</h2>
        <p className="text-xs text-mutado mb-4">Revisa el motivo y decide si se reintenta la entrega</p>
        <ListaPedidosRechazados pedidos={pedidos} alReprocesar={reprocesar} />
      </div>
    </div>
  )
}
