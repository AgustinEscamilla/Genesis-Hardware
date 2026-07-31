// aqui puse profe yo muestro la rentabilidad de una zona logistica
import { formatear_precio } from '../../../services/formato_moneda'

export function TarjetaMetricaZona({ metrica }) {
    return (
        <div className="bg-panel border border-borde rounded-lg p-4 flex flex-col gap-1">
            <p className="text-xs uppercase tracking-widest text-mutado">Zona {metrica.zona}</p>
            <p className="text-lg font-bold text-texto">{formatear_precio(metrica.totalVentas)}</p>
            <p className="text-[10px] text-mutado">{metrica.cantidadPedidos} pedidos entregados</p>
            <p className="text-[10px] text-terciario">Ticket promedio {formatear_precio(metrica.ticketPromedio)}</p>
        </div>
    )
}
