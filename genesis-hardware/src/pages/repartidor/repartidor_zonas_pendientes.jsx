import { RepartidorTarjetaZonaPendiente } from './repartidor_tarjeta_zona_pendiente'

// pos esto funciona yo listo las zonas con pedidos esperando manifiesto
export function RepartidorZonasPendientes({ zonasPendientes, alGenerar }) {
  const zonas = Object.entries(zonasPendientes)

  return (
    <div className="border border-borde bg-panel rounded-lg p-4 flex flex-col gap-3">
      <p className="text-xs uppercase tracking-widest text-primario flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primario" />Zonas pendientes de manifiesto</p>
      {!zonas.length && <p className="text-xs text-mutado">Sin pedidos listos para agrupar</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {zonas.map(([zona, pedidos]) => (
          <RepartidorTarjetaZonaPendiente key={zona} zona={zona} pedidos={pedidos} alGenerar={alGenerar} />
        ))}
      </div>
    </div>
  )
}
