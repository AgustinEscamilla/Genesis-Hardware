import { TarjetaPedido } from '../../components/tarjeta_pedido'
import { usePedidosPagadosEmpleado } from '../../hooks/use_pedidos_pagados_empleado'

// aqui maestro yo muestro los pedidos listos para empacar o asignar
export function VistaPedidosPagadosEmpleado() {
  const { pedidos, cargando, error } = usePedidosPagadosEmpleado()

  if (cargando) return <div className="flex min-h-40 items-center justify-center text-xs text-slate-400">Cargando pedidos</div>

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100 flex flex-col gap-6">
      {error && <div className="border border-red-500 bg-slate-900 p-4 text-xs text-red-400">{error}</div>}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-1">Pedidos</h2>
        <p className="text-xs text-slate-400">Empaca los pedidos y asignalos al repartidor</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {pedidos.map(({ pedido, acciones }) => <TarjetaPedido key={pedido.id} pedido={pedido} acciones={acciones} />)}
        {!pedidos.length && <p className="text-xs text-slate-400">No hay pedidos pendientes de empaque</p>}
      </div>
    </div>
  )
}
