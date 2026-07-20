// esto sirve para mostrar un manifiesto activo con sus pedidos agrupados
export function RepartidorTarjetaManifiesto({ manifiesto, pedidos, alEntregar }) {
  return (
    <div className="border border-borde bg-panel p-3 flex flex-col gap-2">
      <p className="text-xs text-primario uppercase">Zona {manifiesto.zona}</p>
      <p className="text-xs text-mutado">Estado {manifiesto.estado}</p>
      <div className="flex flex-col gap-1">
        {pedidos.map((p) => <p key={p.id} className="text-xs text-texto">Pedido {p.id.slice(0, 8)}</p>)}
      </div>
      {manifiesto.estado !== 'entregado' && (
        <button onClick={() => alEntregar(manifiesto)} className="text-xs border border-primario text-primario px-3 py-1 hover:bg-primario hover:text-fondo transition-colors">
          Marcar manifiesto entregado
        </button>
      )}
    </div>
  )
}
