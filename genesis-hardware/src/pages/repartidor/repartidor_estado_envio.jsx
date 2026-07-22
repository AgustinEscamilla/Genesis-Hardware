import { useEffect } from 'react'
import { actualizarEstadoPedido, ESTADOS_PEDIDO } from '../../services/servicio_flujo_pedidos'

const etiquetas = { en_transito: 'En transito', entregado: 'Entregado' }

// pos esto funciona para marcar el pedido real como entregado cuando el mock termina
export function RepartidorEstadoEnvio({ pedido, estado_envio }) {
    useEffect(() => {
        if (estado_envio === 'entregado' && pedido.estado !== ESTADOS_PEDIDO.ENTREGADO) {
            actualizarEstadoPedido(pedido, ESTADOS_PEDIDO.ENTREGADO)
        }
    }, [estado_envio, pedido])

    return (
        <div className="bg-panel border border-borde p-4 flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-primario">Estado del envio</p>
            <p className="text-sm text-texto">{etiquetas[estado_envio] || estado_envio}</p>
        </div>
    )
}
