import { useManifiestos } from '../../hooks/use_manifiestos'
import { RepartidorZonasPendientes } from './repartidor_zonas_pendientes'

// esto sirve para auditar que el pedido este correcto y sin anomalias antes de salir
export function VistaPedidosAsignadosRepartidor() {
  const { zonasPendientes, generar } = useManifiestos()

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-panel border border-borde p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-1">Pedidos asignados</h2>
        <p className="text-xs text-mutado">Revisa cada zona lista para despacho antes de generar el manifiesto</p>
      </div>
      <RepartidorZonasPendientes zonasPendientes={zonasPendientes} alGenerar={generar} />
    </div>
  )
}
