// aqui puse profe yo renderizo cada pedido con su contenido y su accion de empaque
export function TarjetaPedidoEmpaque({ pedido, accion, textoAccion, inventarioPorId = {} }) {
    return (
        <div className="flex flex-col gap-3 border border-borde bg-panel p-4 transition-colors hover:border-primario/60">
            <div className="flex items-center justify-between"><p className="text-xs font-bold text-primario">Pedido {pedido.id.slice(0, 8)}</p><span className="text-[10px] uppercase tracking-widest text-mutado">Revision</span></div>
            <div className="flex flex-col gap-1">
                {pedido.carrito?.map((i, idx) => (
                    <p key={idx} className="text-xs text-texto">
                        {i.nombre} x {i.cantidad}
                        {inventarioPorId[i.id] !== undefined && <span className="text-mutado"> stock actual {inventarioPorId[i.id]}</span>}
                    </p>
                ))}
            </div>
            {accion
                ? <button onClick={() => accion(pedido)} className="text-xs border border-primario text-primario px-3 py-1 rounded hover:bg-primario hover:text-fondo transition-colors">
                    {textoAccion}
                </button>
                : <p className="text-xs text-mutado">{textoAccion}</p>}
        </div>
    )
}
