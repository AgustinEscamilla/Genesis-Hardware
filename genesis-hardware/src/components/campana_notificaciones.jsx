import { useState } from 'react'

// esto sirve para mostrar un icono de campana con las notificaciones del cliente
export function CampanaNotificaciones({ notificaciones = [], alMarcarLeida }) {
  const [abierto, setAbierto] = useState(false)
  const sinLeer = notificaciones.filter((n) => !n.leido).length

  return (
    <>
      <button type="button" aria-expanded={abierto} onClick={() => setAbierto(true)} className="relative border border-borde px-3 py-2 text-xs text-texto transition-colors hover:bg-fondo focus:outline-none focus:ring-2 focus:ring-primario">
        Alertas
        {sinLeer > 0 && <span className="absolute -top-2 -right-2 bg-primario text-fondo text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{sinLeer}</span>}
      </button>
      {abierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={() => setAbierto(false)}>
          <div onClick={(evento) => evento.stopPropagation()} className="flex max-h-[80vh] w-full max-w-sm flex-col gap-2 overflow-auto rounded-xl border border-borde bg-panel p-4 shadow-vidrio">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-sm font-bold text-texto">Notificaciones</p>
              <button type="button" onClick={() => setAbierto(false)} className="text-xs text-mutado hover:text-texto">Cerrar</button>
            </div>
            {!notificaciones.length && <p className="text-xs text-mutado">Sin notificaciones por ahora</p>}
            {notificaciones.map((n) => (
              <button type="button" key={n.id} onClick={() => alMarcarLeida(n.id)} className={`cursor-pointer border border-borde p-2 text-left text-xs ${n.leido ? 'text-mutado' : 'text-texto'}`}>
                {n.mensaje}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
