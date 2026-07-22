// aqui puse profe yo muestro un reclamo individual con su estado actual
export function TarjetaReclamo({ reclamo }) {
    const resuelto = reclamo.estado === 'resuelto'

    return (
        <div className="border border-borde bg-fondo rounded-lg p-3 flex flex-col gap-1">
            <div className="flex items-center justify-between">
                <p className="text-xs text-texto font-semibold uppercase">{reclamo.motivo}</p>
                <span className={`text-[10px] rounded-full px-2 py-0.5 border ${resuelto ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40' : 'bg-terciario/10 text-terciario border-terciario/40'}`}>
                    {resuelto ? 'Resuelto' : 'Pendiente'}
                </span>
            </div>
            <p className="text-[11px] text-mutado">{reclamo.descripcion}</p>
            <p className="text-[10px] text-mutado">Pedido {reclamo.pedidoId.slice(0, 8)}</p>
        </div>
    )
}
