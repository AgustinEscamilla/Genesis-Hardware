import { TarjetaMetricaZona } from './tarjeta_metrica_zona'

// esto sirve para listar la rentabilidad de todas las zonas logisticas
export function ListaMetricasZona({ metricas }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {metricas.map((m) => <TarjetaMetricaZona key={m.zona} metrica={m} />)}
            {!metricas.length && <p className="text-xs text-mutado">Aun no hay pedidos entregados para medir</p>}
        </div>
    )
}
