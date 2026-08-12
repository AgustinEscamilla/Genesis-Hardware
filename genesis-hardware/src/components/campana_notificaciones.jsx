import { useState } from 'react'
import { createPortal } from 'react-dom'

// esto sirve para mostrar un icono de campana con las notificaciones del cliente
export function CampanaNotificaciones({ notificaciones = [], alMarcarLeida, alLimpiarNotificaciones }) {
  const [abierto, setAbierto] = useState(false)
  const [confirmacionAbierta, setConfirmacionAbierta] = useState(false)
  const sinLeer = notificaciones.filter((n) => !n.leido).length

  const manejarLimpieza = async () => {
   if (!alLimpiarNotificaciones) return
   await alLimpiarNotificaciones(notificaciones.map((n) => n.id))
   setConfirmacionAbierta(false)
   setAbierto(false)
 }

  return (
    <>
      <button type="button" aria-expanded={abierto} onClick={() => setAbierto(true)} className="relative border border-terciario/60 bg-terciario/10 px-3 py-2 text-xs font-bold uppercase tracking-wide text-terciario transition-colors hover:bg-terciario hover:text-fondo focus:outline-none focus:ring-2 focus:ring-terciario">
        Notificaciones
        {sinLeer > 0 && <span className="absolute -top-2 -right-2 bg-primario text-fondo text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{sinLeer}</span>}
      </button>
      {abierto && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm" onClick={() => setAbierto(false)}>
          <div onClick={(evento) => evento.stopPropagation()} className="flex max-h-[80vh] w-full max-w-[520px] flex-col overflow-hidden rounded-2xl border border-terciario/40 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-borde bg-slate-950 px-5 py-4">
              <div><p className="text-lg font-black text-texto">Notificaciones</p><p className="mt-1 text-xs text-mutado">{sinLeer} sin leer de {notificaciones.length} recibidas</p></div>
              <div className="flex items-center gap-2">
                {notificaciones.length > 0 && (
                  <button type="button" onClick={() => setConfirmacionAbierta(true)} className="rounded-lg border border-borde px-3 py-2 text-xs font-bold text-mutado hover:border-primario hover:text-texto">Limpiar</button>
                )}
                <button type="button" onClick={() => setAbierto(false)} className="rounded-lg border border-borde px-3 py-2 text-xs font-bold text-mutado hover:border-terciario hover:text-texto">Cerrar</button>
              </div>
            </div>
            <div className="space-y-3 overflow-y-auto p-5">
              {!notificaciones.length && <p className="rounded-lg border border-dashed border-borde p-6 text-center text-sm text-mutado">Sin notificaciones por ahora</p>}
              {notificaciones.map((n) => (
                <button type="button" key={n.id} onClick={() => alMarcarLeida(n.id)} className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors ${n.leido ? 'border-borde bg-slate-950 text-mutado' : 'border-terciario/40 bg-terciario/10 text-texto hover:bg-terciario/20'}`}>
                  <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${n.leido ? 'bg-mutado' : 'bg-terciario'}`} />
                  <span className="text-sm leading-6">{n.mensaje}</span>
                </button>
              ))}
            </div>
          </div>
        </div>, document.body
      )}
      {confirmacionAbierta && createPortal(
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm" onClick={() => setConfirmacionAbierta(false)}>
          <div onClick={(evento) => evento.stopPropagation()} className="w-full max-w-sm rounded-2xl border border-borde bg-panel p-6 shadow-vidrio">
            <div className="mb-5">
              <p className="text-lg font-black text-texto">Limpiar notificaciones</p>
              <p className="mt-2 text-sm text-mutado">¿Deseas borrar todas las notificaciones actuales?</p>
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setConfirmacionAbierta(false)} className="rounded-lg border border-borde px-4 py-2 text-xs font-bold text-mutado hover:text-texto">Cancelar</button>
              <button type="button" onClick={manejarLimpieza} className="rounded-lg bg-primario px-4 py-2 text-xs font-black text-white hover:opacity-90">Confirmar</button>
            </div>
          </div>
        </div>, document.body
      )}
    </>
  )
}
