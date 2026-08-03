import { Link } from 'react-router-dom'
import { useMetricasAdministrador } from '../../../hooks/use_metricas_administrador'
import { ListaMetricasZona } from './lista_metricas_zona'
import { TablaEficaciaRepartidores } from './tabla_eficacia_repartidores'

// esto sirve para mostrar el dashboard analitico de rentabilidad y eficacia
export function VistaDashboardAdministrador() {
    const { rentabilidadPorZona, eficaciaRepartidores, cargando, error } = useMetricasAdministrador()

    if (cargando) return <div className="flex min-h-40 items-center justify-center text-xs text-mutado">Cargando reportes</div>

    return (
        <div className="flex flex-col gap-6 text-texto">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primario">Centro de control</p><h1 className="mt-2 text-3xl font-black text-texto">Reportes operativos</h1><p className="mt-1 text-sm text-mutado">Consulta ventas y desempeño de entregas en Campeche</p></div>
                <Link to="/administrador/tablas" className="border border-borde bg-panel px-4 py-2 text-xs font-bold uppercase tracking-wide text-texto transition-colors hover:border-primario hover:text-primario">Regresar al menu</Link>
            </div>
            {error && <div className="rounded-lg border border-primario/50 bg-primario/10 p-4 text-sm text-primario">{error}</div>}
            <section className="rounded-lg border border-borde bg-panel p-5">
                <h2 className="text-xl font-bold text-texto">Rentabilidad por zona</h2>
                <p className="mb-4 mt-1 text-sm text-mutado">Ventas totales de pedidos entregados</p>
                <ListaMetricasZona metricas={rentabilidadPorZona} />
            </section>
            <section className="rounded-lg border border-borde bg-panel p-5">
                <h2 className="text-xl font-bold text-texto">Eficacia de repartidores</h2>
                <p className="mb-4 mt-1 text-sm text-mutado">Entregas exitosas contra rechazos por repartidor</p>
                <TablaEficaciaRepartidores repartidores={eficaciaRepartidores} />
            </section>
        </div>
    )
}
