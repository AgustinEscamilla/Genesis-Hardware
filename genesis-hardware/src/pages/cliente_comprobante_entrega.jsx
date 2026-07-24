import { useComprobantePedido } from '../hooks/use_comprobante_pedido'

// esto sirve para que el cliente vea la evidencia fotografica de su entrega
export function ClienteComprobanteEntrega({ pedidoId }) {
    const { comprobante } = useComprobantePedido(pedidoId)

    if (!comprobante) return null

    return (
        <div className="border border-borde bg-fondo rounded-lg p-3 flex flex-col gap-2">
            <p className="text-[10px] uppercase tracking-widest text-emerald-400">Comprobante de entrega</p>
            <img src={comprobante.imagenUrl} alt="comprobante de entrega" className="w-full max-w-xs rounded border border-borde" />
            {comprobante.nota && <p className="text-xs text-mutado">{comprobante.nota}</p>}
        </div>
    )
}
