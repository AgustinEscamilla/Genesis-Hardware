// aqui puse profe la fila individual del carrito con sus controles de cantidad
export function ItemCarrito({ item, al_ajustar, al_quitar }) {
    return (
        <div className="flex items-center gap-3 border-b border-borde py-3 text-xs text-texto">
            {item.imagen ? <img src={item.imagen} alt={item.nombre} className="h-12 w-12 rounded-lg bg-fondo object-contain" /> : <span className="grid h-12 w-12 place-items-center rounded-lg bg-fondo text-lg text-mutado">▣</span>}
            <div className="min-w-0 flex-1"><p className="truncate font-bold">{item.nombre}</p><p className="mt-1 text-mutado">${Number(item.precio || 0).toLocaleString('es-MX')} MXN</p></div>
            <div className="flex items-center gap-2">
                <button onClick={() => al_ajustar(item.id, -1)} className="border border-borde px-2 hover:border-primario">-</button>
                <span className="text-mutado">{item.cantidad}</span>
                <button onClick={() => al_ajustar(item.id, 1)} className="border border-borde px-2 hover:border-primario">+</button>
            </div>
            <button onClick={() => al_quitar(item.id)} className="ml-3 text-primario hover:underline">Quitar</button>
        </div>
    )
}
