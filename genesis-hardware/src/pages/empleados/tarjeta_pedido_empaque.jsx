// aqui puse profe yo renderizo cada pedido con su contenido y su accion de empaque
export function TarjetaPedidoEmpaque({ pedido, accion, textoAccion, inventarioPorId = {} }) {
    return (
        <div className="border border-borde bg-panel p-3 flex flex-col gap-2 rounded-lg">
            <p className="text-xs text-primario">Pedido {pedido.id.slice(0, 8)}</p>
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
