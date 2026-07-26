// aqui puse profe yo muestro la rentabilidad de una zona logistica
export function TarjetaMetricaZona({ metrica }) {
    return (
        <div className="bg-panel border border-borde rounded-lg p-4 flex flex-col gap-1">
            <p className="text-xs uppercase tracking-widest text-mutado">Zona {metrica.zona}</p>
            <p className="text-lg font-bold text-texto">${metrica.totalVentas.toFixed(2)}</p>
            <p className="text-[10px] text-mutado">{metrica.cantidadPedidos} pedidos entregados</p>
            <p className="text-[10px] text-terciario">Ticket promedio ${metrica.ticketPromedio.toFixed(2)}</p>
        </div>
    )
}
