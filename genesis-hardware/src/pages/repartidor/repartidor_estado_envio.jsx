import { FormularioComprobanteEntrega } from './formulario_comprobante_entrega'

const etiquetas = { en_transito: 'En transito', entregado: 'Entregado' }

// pos esto funciona para mostrar el estado del envio y pedir el comprobante final
export function RepartidorEstadoEnvio({ pedido, estado_envio }) {
    const yaEntregado = pedido.estado === 'entregado'

    return (
        <div className="flex flex-col gap-3">
            <div className="bg-panel border border-borde rounded-lg p-4 flex items-center justify-between">
                <p className="text-xs uppercase tracking-widest text-mutado">Estado del envio</p>
                <span className={`text-xs font-semibold rounded-full px-3 py-1 border ${estado_envio === 'entregado' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40' : 'bg-terciario/10 text-terciario border-terciario/40'}`}>
                    {etiquetas[estado_envio] || estado_envio}
                </span>
            </div>
            {estado_envio === 'entregado' && !yaEntregado && <FormularioComprobanteEntrega pedido={pedido} />}
        </div>
    )
}
