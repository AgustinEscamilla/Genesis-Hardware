import { useManifiestos } from '../../hooks/use_manifiestos'
import { RepartidorZonasPendientes } from './repartidor_zonas_pendientes'

// esto sirve para auditar que el pedido este correcto y sin anomalias antes de salir
export function VistaPedidosAsignadosRepartidor() {
  const { zonasPendientes, generar, cargando, error } = useManifiestos()

  if (cargando) {
    return <div className="flex min-h-40 items-center justify-center text-xs text-mutado">Cargando pedidos asignados</div>
  }

  return (
    <div className="flex flex-col gap-4">
      {error && <div className="border border-primario bg-panel p-4 text-xs text-primario">{error}</div>}
      <div className="bg-panel border border-borde p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-1">Pedidos asignados</h2>
        <p className="text-xs text-mutado">Solo se muestran los pedidos asignados a tu cuenta antes de generar el manifiesto</p>
      </div>
      <RepartidorZonasPendientes zonasPendientes={zonasPendientes} alGenerar={generar} />
    </div>
  )
}
