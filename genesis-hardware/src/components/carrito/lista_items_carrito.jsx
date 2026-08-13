import { ItemCarrito } from './item_carrito'

// esto sirve para recorrer cada producto del carrito y mostrar su fila
export function ListaItemsCarrito({ carrito, al_ajustar, al_quitar }) {
    if (!carrito?.length) return <p className="text-xs text-mutado">Tu carrito esta vacio por ahora</p>

    return (
        <div className="flex flex-col gap-1">
            {carrito.map((item) => (
                <ItemCarrito key={item.id} item={item} al_ajustar={al_ajustar} al_quitar={al_quitar} />
            ))}
        </div>
    )
}
