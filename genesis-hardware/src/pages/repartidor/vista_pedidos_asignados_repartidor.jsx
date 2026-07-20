import { useManifiestos } from '../../hooks/use_manifiestos'
import { RepartidorZonasPendientes } from './repartidor_zonas_pendientes'

// esto sirve para auditar que el pedido este correcto y sin anomalias antes de salir
export function VistaPedidosAsignadosRepartidor() {
  const { zonasPendientes, generar } = useManifiestos()

  return (
    <div className="min-h-screen bg-fondo p-6 text-texto">
      <div className="bg-panel border border-borde p-6 rounded-lg flex flex-col gap-3">
        <h2 className="text-xl font-bold mb-1">Pedidos asignados</h2>
        <p className="text-xs text-mutado mb-2">Revisa cada zona lista para despacho antes de generar el manifiesto</p>
        <RepartidorZonasPendientes zonasPendientes={zonasPendientes} alGenerar={generar} />
      </div>
    </div>
  )
}
