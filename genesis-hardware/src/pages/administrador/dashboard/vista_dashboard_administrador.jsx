import { useMetricasAdministrador } from '../../../hooks/use_metricas_administrador'
import { ListaMetricasZona } from './lista_metricas_zona'
import { TablaEficaciaRepartidores } from './tabla_eficacia_repartidores'

// esto sirve para mostrar el dashboard analitico de rentabilidad y eficacia
export function VistaDashboardAdministrador() {
    const { rentabilidadPorZona, eficaciaRepartidores } = useMetricasAdministrador()

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-xl font-bold mb-1">Rentabilidad por zona</h2>
                <p className="text-xs text-mutado mb-3">Ventas totales de pedidos ya entregados</p>
                <ListaMetricasZona metricas={rentabilidadPorZona} />
            </div>
            <div className="bg-panel border border-borde rounded-lg p-4">
                <h2 className="text-xl font-bold mb-1">Eficacia de repartidores</h2>
                <p className="text-xs text-mutado mb-3">Entregas exitosas contra rechazos por repartidor</p>
                <TablaEficaciaRepartidores repartidores={eficaciaRepartidores} />
            </div>
        </div>
    )
}
