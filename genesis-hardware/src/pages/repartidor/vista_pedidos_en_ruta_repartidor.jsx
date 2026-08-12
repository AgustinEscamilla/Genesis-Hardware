import { TarjetaPedido } from '../../components/tarjeta_pedido'
import { usePedidosEnRutaRepartidor } from '../../hooks/use_pedidos_en_ruta_repartidor'

// aqui puse profe para que el repartidor marque como entregado cada pedido en ruta
export function VistaPedidosEnRutaRepartidor() {
  const { pedidos, cargando, error, marcarEntregado } = usePedidosEnRutaRepartidor()

  if (cargando) return <div className="flex min-h-40 items-center justify-center text-xs text-slate-400">Cargando pedidos en ruta</div>

  return (
    <div className="flex flex-col gap-6">
      {error && <div className="border border-red-500 bg-slate-900 p-4 text-xs text-red-400">{error}</div>}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-1">Pedidos en ruta</h2>
        <p className="text-xs text-slate-400">Solo ves pedidos en ruta asignados a tu cuenta para marcar entrega</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {pedidos.map((pedido) => (
          <TarjetaPedido key={pedido.id} pedido={pedido} acciones={[{ texto: 'Marcar como Entregado', alClick: () => marcarEntregado(pedido) }]} />
        ))}
        {!pedidos.length && <p className="text-xs text-slate-400">No tienes pedidos en ruta por ahora</p>}
      </div>
    </div>
  )
}
