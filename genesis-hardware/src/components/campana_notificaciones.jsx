import { useState } from 'react'

// esto sirve para mostrar un icono de campana con las notificaciones del cliente
export function CampanaNotificaciones({ notificaciones = [], alMarcarLeida }) {
  const [abierto, setAbierto] = useState(false)
  const sinLeer = notificaciones.filter((n) => !n.leido).length

  return (
    <div className="relative">
      <button type="button" aria-expanded={abierto} onClick={() => setAbierto(!abierto)} className="relative border border-borde px-3 py-2 text-xs text-texto transition-colors hover:bg-fondo focus:outline-none focus:ring-2 focus:ring-primario">
        Alertas
        {sinLeer > 0 && <span className="absolute -top-2 -right-2 bg-primario text-fondo text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{sinLeer}</span>}
      </button>
      {abierto && (
        <div className="absolute right-0 z-20 mt-2 flex max-h-80 w-[min(18rem,calc(100vw-2rem))] flex-col gap-2 overflow-auto border border-borde bg-panel p-3 shadow-2xl">
          {!notificaciones.length && <p className="text-xs text-mutado">Sin notificaciones por ahora</p>}
          {notificaciones.map((n) => (
            <button type="button" key={n.id} onClick={() => alMarcarLeida(n.id)} className={`cursor-pointer border border-borde p-2 text-left text-xs ${n.leido ? 'text-mutado' : 'text-texto'}`}>
              {n.mensaje}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
