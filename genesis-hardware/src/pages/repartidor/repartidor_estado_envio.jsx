import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormularioComprobanteEntrega } from './formulario_comprobante_entrega'
import { FormularioRechazoEntrega } from './formulario_rechazo_entrega'

const etiquetas = { en_transito: 'En transito', entregado: 'Entregado' }

// pos esto funciona para mostrar el estado del envio y pedir comprobante o rechazo
export function RepartidorEstadoEnvio({ pedido, estado_envio }) {
    const [rechazando, setRechazando] = useState(false)
    const navegar = useNavigate()
    const yaCerrado = pedido.estado === 'entregado' || pedido.estado === 'rechazado'

    return (
        <div className="flex flex-col gap-3">
            <div className="bg-panel border border-borde rounded-lg p-4 flex items-center justify-between">
                <p className="text-xs uppercase tracking-widest text-mutado">Estado del envio</p>
                <span className={`text-xs font-semibold rounded-full px-3 py-1 border ${estado_envio === 'entregado' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40' : 'bg-terciario/10 text-terciario border-terciario/40'}`}>
                    {etiquetas[estado_envio] || estado_envio}
                </span>
            </div>
            {estado_envio === 'entregado' && !yaCerrado && !rechazando && (
                <>
                    <FormularioComprobanteEntrega pedido={pedido} al_confirmar={() => navegar('/repartidores/en-ruta')} />
                    <button onClick={() => setRechazando(true)} className="text-[10px] text-mutado underline self-start">
                        El cliente rechazo el pedido
                    </button>
                </>
            )}
            {estado_envio === 'entregado' && !yaCerrado && rechazando && <FormularioRechazoEntrega pedido={pedido} />}
        </div>
    )
}
