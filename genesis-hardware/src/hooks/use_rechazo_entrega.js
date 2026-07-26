import { useState } from 'react'
import { actualizarEstadoPedido, ESTADOS_PEDIDO } from '../services/servicio_flujo_pedidos'

// esto sirve para que el repartidor registre el rechazo del cliente en la entrega
export function useRechazoEntrega(pedido) {
    const [motivo, setMotivo] = useState('')
    const [confirmando, setConfirmando] = useState(false)
    const [mensaje_error, setMensajeError] = useState('')

    const confirmar = async () => {
        if (!motivo || !pedido) return
        setConfirmando(true)
        setMensajeError('')
        try { await actualizarEstadoPedido(pedido, ESTADOS_PEDIDO.RECHAZADO, { motivoRechazo: motivo }) }
        catch { setMensajeError('No se pudo registrar el rechazo') }
        finally { setConfirmando(false) }
    }

    return { motivo, setMotivo, confirmar, confirmando, mensaje_error }
}
