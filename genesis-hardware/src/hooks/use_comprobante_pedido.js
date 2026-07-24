import { useEffect, useState } from 'react'
import { escucharComprobantePedido } from '../services/servicio_comprobantes'

// aqui maestro yo expongo el comprobante de entrega asociado a un pedido
export function useComprobantePedido(pedidoId) {
    const [comprobante, setComprobante] = useState(null)

    useEffect(() => {
        if (!pedidoId) return undefined
        return escucharComprobantePedido(pedidoId, setComprobante)
    }, [pedidoId])

    return { comprobante }
}
