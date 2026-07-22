import { useState } from 'react'

// aqui maestro yo controlo si el modal del carrito esta visible o cerrado
export function use_modal_carrito() {
    const [abierto, set_abierto] = useState(false)

    return { abierto, alternar: () => set_abierto((valor) => !valor), cerrar: () => set_abierto(false) }
}
