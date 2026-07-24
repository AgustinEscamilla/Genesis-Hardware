import { useState } from 'react'
import { useSubidaImagen } from './use_subida_imagen'
import { crearComprobante } from '../services/servicio_comprobantes'
import { actualizarEstadoPedido, ESTADOS_PEDIDO } from '../services/servicio_flujo_pedidos'

// esto sirve para capturar la evidencia fotografica y cerrar la entrega del pedido
export function useComprobanteEntrega(pedido) {
    const [nota, setNota] = useState('')
    const [confirmando, setConfirmando] = useState(false)
    const { urlImagen, subiendo, mensaje, subir } = useSubidaImagen()

    const confirmar = async () => {
        if (!urlImagen || !pedido) return
        setConfirmando(true)
        await crearComprobante({ pedidoId: pedido.id, imagenUrl: urlImagen, nota })
        await actualizarEstadoPedido(pedido, ESTADOS_PEDIDO.ENTREGADO)
        setConfirmando(false)
    }

    return { nota, setNota, urlImagen, subiendo, mensaje, subir, confirmar, confirmando }
}
