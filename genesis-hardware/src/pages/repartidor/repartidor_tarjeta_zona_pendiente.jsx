// aqui maestro yo muestro una zona con sus pedidos pendientes de manifiesto
export function RepartidorTarjetaZonaPendiente({ zona, pedidos, alGenerar }) {
  return (
    <div className="border border-borde bg-panel p-3 flex flex-col gap-2">
      <p className="text-xs text-primario uppercase">{zona}</p>
      <p className="text-xs text-mutado">{pedidos.length} pedidos listos para despacho</p>
      <button onClick={() => alGenerar(zona, pedidos)} className="text-xs border border-primario text-primario px-3 py-1 hover:bg-primario hover:text-fondo transition-colors">
        Generar manifiesto
      </button>
    </div>
  )
}
