// esto sirve para mostrar un manifiesto activo con sus pedidos agrupados
export function RepartidorTarjetaManifiesto({ manifiesto, pedidos, alEntregar }) {
  const entregado = manifiesto.estado === 'entregado'

  return (
    <div className="border border-borde bg-fondo rounded-lg p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-texto uppercase font-semibold">Zona {manifiesto.zona}</p>
        <span className={`text-[10px] rounded-full px-2 py-0.5 border ${entregado ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40' : 'bg-terciario/10 text-terciario border-terciario/40'}`}>
          {entregado ? 'Entregado' : 'En reparto'}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {pedidos.map((p) => <p key={p.id} className="text-[11px] text-mutado">Pedido {p.id.slice(0, 8)}</p>)}
      </div>
      {!entregado && (
        <button onClick={() => alEntregar(manifiesto)} className="text-xs border border-primario text-primario px-3 py-1.5 rounded hover:bg-primario hover:text-fondo transition-colors self-start">
          Marcar manifiesto entregado
        </button>
      )}
    </div>
  )
}
