// aqui puse profe la fila individual del carrito con sus controles de cantidad
export function ItemCarrito({ item, al_ajustar, al_quitar }) {
    return (
        <div className="flex justify-between items-center border-b border-borde py-2 text-xs text-texto">
            <p className="flex-1">{item.nombre}</p>
            <div className="flex items-center gap-2">
                <button onClick={() => al_ajustar(item.id, -1)} className="border border-borde px-2 hover:border-primario">-</button>
                <span className="text-mutado">{item.cantidad}</span>
                <button onClick={() => al_ajustar(item.id, 1)} className="border border-borde px-2 hover:border-primario">+</button>
            </div>
            <button onClick={() => al_quitar(item.id)} className="ml-3 text-primario hover:underline">Quitar</button>
        </div>
    )
}
