import { useReporteFallas } from '../../hooks/use_reporte_fallas'

// aqui maestro yo presento el formulario de reporte de incidencias del coche
export function VistaReporteFallasRepartidor() {
  const { forma, cambiar, enviar, mensaje, guardando } = useReporteFallas()

  return (
    <div className="min-h-screen bg-fondo p-6 text-texto">
      <div className="bg-panel border border-borde p-6 rounded-lg max-w-lg">
        <h2 className="text-xl font-bold mb-3">Reporte de fallas</h2>
        <input value={forma.cofre} onChange={(e) => cambiar('cofre', e.target.value)} placeholder="Seccion del coche" className="w-full bg-fondo border border-borde text-texto px-3 py-2 text-xs mb-3" />
        <textarea value={forma.mensaje} onChange={(e) => cambiar('mensaje', e.target.value)} placeholder="Describe la incidencia" rows={4} className="w-full bg-fondo border border-borde text-texto px-3 py-2 text-xs mb-3 resize-none" />
        <button onClick={enviar} disabled={guardando} className="border border-primario text-primario text-xs px-4 py-2 hover:bg-primario hover:text-fondo disabled:opacity-50 transition-colors">{guardando ? 'Enviando reporte...' : 'Enviar reporte'}</button>
        {mensaje && <p className="mt-3 text-xs text-primario">{mensaje}</p>}
      </div>
    </div>
  )
}
