import { TarjetaPedidoRechazado } from './tarjeta_pedido_rechazado'

// maestro funciona asi yo listo todos los pedidos que fueron rechazados por el cliente
export function ListaPedidosRechazados({ pedidos, alReprocesar }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {pedidos.map((p) => <TarjetaPedidoRechazado key={p.id} pedido={p} alReprocesar={alReprocesar} />)}
      {!pedidos.length && <p className="text-xs text-mutado">No hay pedidos rechazados por ahora</p>}
    </div>
  )
}
