import { useState } from 'react'
import { actualizarEstadoPedido, ESTADOS_PEDIDO } from '../services/servicio_flujo_pedidos'

// esto sirve para que el repartidor registre el rechazo del cliente en la entrega
export function useRechazoEntrega(pedido) {
    const [motivo, setMotivo] = useState('')
    const [confirmando, setConfirmando] = useState(false)

    const confirmar = async () => {
        if (!motivo || !pedido) return
        setConfirmando(true)
        await actualizarEstadoPedido(pedido, ESTADOS_PEDIDO.RECHAZADO, { motivoRechazo: motivo })
        setConfirmando(false)
    }

    return { motivo, setMotivo, confirmar, confirmando }
}
