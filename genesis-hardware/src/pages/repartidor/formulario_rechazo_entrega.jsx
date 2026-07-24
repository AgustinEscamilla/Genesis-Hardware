import { useRechazoEntrega } from '../../hooks/use_rechazo_entrega'

// aqui puse profe yo registro el motivo cuando el cliente rechaza la entrega
export function FormularioRechazoEntrega({ pedido }) {
  const { motivo, setMotivo, confirmar, confirmando } = useRechazoEntrega(pedido)

  return (
    <div className="bg-panel border border-primario/40 rounded-lg p-4 flex flex-col gap-3">
      <p className="text-xs uppercase tracking-widest text-primario">Rechazo de entrega</p>
      <textarea value={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Describe por que el cliente rechazo el pedido" rows={3} className="w-full bg-fondo border border-borde rounded text-texto px-3 py-2 text-xs resize-none focus:outline-none focus:border-primario transition-colors" />
      <button onClick={confirmar} disabled={!motivo || confirmando} className="border border-primario bg-primario/10 text-primario text-xs font-semibold uppercase tracking-wide px-4 py-2 rounded hover:bg-primario hover:text-fondo disabled:opacity-50 transition-colors self-start">
        {confirmando ? 'Registrando rechazo...' : 'Confirmar rechazo'}
      </button>
    </div>
  )
}
