// aqui puse profe yo dibujo el formulario para levantar el reclamo del pedido
export function FormularioReclamo({ forma, cambiar, enviar, mensaje, guardando }) {
    return (
        <div className="bg-panel border border-borde p-6 rounded-lg flex flex-col gap-3">
            <h2 className="text-xl font-bold mb-1">Levantar reclamo</h2>
            <p className="text-xs text-mutado mb-2">Cuentanos que fallo con tu pedido entregado</p>
            <label className="text-[10px] uppercase tracking-widest text-mutado">Motivo</label>
            <input value={forma.motivo} onChange={(e) => cambiar('motivo', e.target.value)} placeholder="Ej mercancia danada" className="w-full bg-fondo border border-borde rounded text-texto px-3 py-2 text-xs focus:outline-none focus:border-primario transition-colors" />
            <label className="text-[10px] uppercase tracking-widest text-mutado">Descripcion</label>
            <textarea value={forma.descripcion} onChange={(e) => cambiar('descripcion', e.target.value)} placeholder="Describe el problema con detalle" rows={4} className="w-full bg-fondo border border-borde rounded text-texto px-3 py-2 text-xs resize-none focus:outline-none focus:border-primario transition-colors" />
            <button onClick={enviar} disabled={guardando} className="border border-primario bg-primario/10 text-primario text-xs font-semibold uppercase tracking-wide px-4 py-2 rounded hover:bg-primario hover:text-fondo disabled:opacity-50 transition-colors self-start">
                {guardando ? 'Enviando reclamo...' : 'Enviar reclamo'}
            </button>
            {mensaje && <p className="text-xs text-emerald-400">{mensaje}</p>}
        </div>
    )
}
