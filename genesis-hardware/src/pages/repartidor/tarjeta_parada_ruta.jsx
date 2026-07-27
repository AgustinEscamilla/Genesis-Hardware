// aqui puse profe yo muestro cada parada con su zona y su numero de orden
export function TarjetaParadaRuta({ parada }) {
    return (
        <div className="border border-borde bg-fondo p-3 flex items-center gap-3 rounded-lg hover:border-primario transition-colors">
            <span className="w-8 h-8 shrink-0 rounded-full bg-primario/10 border border-primario text-primario text-sm font-bold flex items-center justify-center">{parada.parada}</span>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-texto uppercase font-semibold">Zona {parada.zona}</p>
                <p className="text-[10px] text-mutado truncate">Pedido {parada.pedido.id.slice(0, 8)}</p>
                <p className="text-[10px] text-mutado truncate">{parada.direccion || 'Direccion no registrada'}</p>
            </div>
            <p className="text-xs text-terciario font-semibold">${parada.pedido.total}</p>
        </div>
    )
}
