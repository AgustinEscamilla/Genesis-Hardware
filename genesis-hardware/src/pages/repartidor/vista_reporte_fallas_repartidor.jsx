import { useReporteFallas } from '../../hooks/use_reporte_fallas'

// aqui maestro yo presento el formulario de reporte de incidencias del coche
export function VistaReporteFallasRepartidor() {
  const { forma, cambiar, enviar, mensaje, guardando } = useReporteFallas()

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-panel border border-borde p-6 rounded-lg max-w-lg">
        <h2 className="text-xl font-bold mb-1">Reporte de fallas</h2>
        <p className="text-xs text-mutado mb-4">Registra cualquier incidencia del vehiculo antes de salir a ruta</p>
        <label className="text-[10px] uppercase tracking-widest text-mutado mb-1 block">Seccion del coche</label>
        <input value={forma.cofre} onChange={(e) => cambiar('cofre', e.target.value)} placeholder="Ej. frenos, luces, llantas" className="w-full bg-fondo border border-borde rounded text-texto px-3 py-2 text-xs mb-3 focus:outline-none focus:border-primario transition-colors" />
        <label className="text-[10px] uppercase tracking-widest text-mutado mb-1 block">Descripcion</label>
        <textarea value={forma.mensaje} onChange={(e) => cambiar('mensaje', e.target.value)} placeholder="Describe la incidencia" rows={4} className="w-full bg-fondo border border-borde rounded text-texto px-3 py-2 text-xs mb-3 resize-none focus:outline-none focus:border-primario transition-colors" />
        <button onClick={enviar} disabled={guardando} className="border border-primario bg-primario/10 text-primario text-xs font-semibold uppercase tracking-wide px-4 py-2 rounded hover:bg-primario hover:text-fondo disabled:opacity-50 transition-colors">{guardando ? 'Enviando reporte...' : 'Enviar reporte'}</button>
        {mensaje && <p className="mt-3 text-xs text-emerald-400">{mensaje}</p>}
      </div>
    </div>
  )
}
