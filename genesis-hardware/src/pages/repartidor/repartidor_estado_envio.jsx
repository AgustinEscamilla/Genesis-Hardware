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
        <div className="bg-panel border border-borde rounded-lg p-4 flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-mutado">Estado del envio</p>
            <span className={`text-xs font-semibold rounded-full px-3 py-1 border ${estado_envio === 'entregado' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40' : 'bg-terciario/10 text-terciario border-terciario/40'}`}>
                {etiquetas[estado_envio] || estado_envio}
            </span>
        </div>
    )
}
