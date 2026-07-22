// aqui maestro yo muestro una zona con sus pedidos pendientes de manifiesto
export function RepartidorTarjetaZonaPendiente({ zona, pedidos, alGenerar }) {
  return (
    <div className="border border-borde bg-fondo rounded-lg p-3 flex flex-col gap-2 hover:border-primario transition-colors">
      <div className="flex items-center justify-between">
        <p className="text-xs text-texto uppercase font-semibold">{zona}</p>
        <span className="text-[10px] bg-primario/10 text-primario border border-primario/40 rounded-full px-2 py-0.5">{pedidos.length} pedidos</span>
      </div>
      <button onClick={() => alGenerar(zona, pedidos)} className="text-xs border border-primario text-primario px-3 py-1.5 rounded hover:bg-primario hover:text-fondo transition-colors self-start">
        Generar manifiesto
      </button>
    </div>
  )
}
