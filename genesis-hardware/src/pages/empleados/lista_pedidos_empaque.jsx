import { TarjetaPedidoEmpaque } from './tarjeta_pedido_empaque'

// maestro funciona asi yo agrupo pedidos de una etapa para operacion diaria
export function ListaPedidosEmpaque({ titulo, pedidos, accion, textoAccion, inventarioPorId }) {
    return (
        <div className="flex flex-col gap-3 border border-borde bg-fondo p-4">
            <div className="flex items-center justify-between border-b border-borde pb-3"><p className="text-xs font-bold uppercase tracking-widest text-primario">{titulo}</p><span className="text-xs text-mutado">{pedidos.length}</span></div>
            {!pedidos.length && <p className="text-xs text-mutado">Sin pedidos en esta etapa</p>}
            <div className="grid grid-cols-1 gap-3">
                {pedidos.map((p) => (
                    <TarjetaPedidoEmpaque key={p.id} pedido={p} accion={accion} textoAccion={textoAccion} inventarioPorId={inventarioPorId} />
                ))}
            </div>
        </div>
    )
}
