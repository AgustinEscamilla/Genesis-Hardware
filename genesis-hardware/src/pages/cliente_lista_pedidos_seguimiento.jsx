import { ClienteTimelinePedido } from './cliente_timeline_pedido'

// maestro funciona asi yo listo cada pedido del cliente con su linea de tiempo
export function ClienteListaPedidosSeguimiento({ pedidos = [] }) {
  if (!pedidos.length) return <p className="text-xs text-mutado">Aun no tienes pedidos registrados</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {pedidos.map((p) => <ClienteTimelinePedido key={p.id} pedido={p} />)}
    </div>
  )
}
