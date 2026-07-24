import { useComprobanteEntrega } from '../../hooks/use_comprobante_entrega'

// aqui puse profe yo pido la foto de evidencia antes de cerrar la entrega
export function FormularioComprobanteEntrega({ pedido }) {
    const { nota, setNota, urlImagen, subiendo, mensaje, subir, confirmar, confirmando } = useComprobanteEntrega(pedido)

    return (
        <div className="bg-panel border border-borde rounded-lg p-4 flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-primario">Comprobante de entrega</p>
            <input type="file" accept="image/*" onChange={(e) => subir(e.target.files[0])} className="text-xs text-mutado" />
            {subiendo && <p className="text-[10px] text-mutado">Subiendo evidencia...</p>}
            {urlImagen && <img src={urlImagen} alt="evidencia entrega" className="w-32 h-32 object-cover rounded border border-borde" />}
            <textarea value={nota} onChange={(e) => setNota(e.target.value)} placeholder="Nota de entrega opcional" rows={2} className="w-full bg-fondo border border-borde rounded text-texto px-3 py-2 text-xs resize-none focus:outline-none focus:border-primario transition-colors" />
            <button onClick={confirmar} disabled={!urlImagen || confirmando} className="border border-primario bg-primario/10 text-primario text-xs font-semibold uppercase tracking-wide px-4 py-2 rounded hover:bg-primario hover:text-fondo disabled:opacity-50 transition-colors self-start">
                {confirmando ? 'Confirmando entrega...' : 'Confirmar entrega'}
            </button>
            {mensaje && <p className="text-xs text-emerald-400">{mensaje}</p>}
        </div>
    )
}
