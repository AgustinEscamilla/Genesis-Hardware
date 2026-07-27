import { Link } from 'react-router-dom'
import { useMetricasAdministrador } from '../../../hooks/use_metricas_administrador'
import { ListaMetricasZona } from './lista_metricas_zona'
import { TablaEficaciaRepartidores } from './tabla_eficacia_repartidores'

// esto sirve para mostrar el dashboard analitico de rentabilidad y eficacia
export function VistaDashboardAdministrador() {
    const { rentabilidadPorZona, eficaciaRepartidores, cargando, error } = useMetricasAdministrador()

    if (cargando) return <div className="flex min-h-40 items-center justify-center text-xs text-mutado">Cargando reportes</div>

    return (
        <div className="flex flex-col gap-6">
            <Link to="/administrador/tablas" className="self-start border border-borde px-4 py-2 text-xs uppercase tracking-wide text-texto transition-colors hover:border-primario hover:text-primario">Regresar al menu principal</Link>
            {error && <div className="border border-primario bg-panel p-4 text-xs text-primario">{error}</div>}
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
