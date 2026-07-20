import { useState } from 'react'

// esto sirve para mostrar un icono de campana con las notificaciones del cliente
export function CampanaNotificaciones({ notificaciones = [], alMarcarLeida }) {
  const [abierto, setAbierto] = useState(false)
  const sinLeer = notificaciones.filter((n) => !n.leido).length

  return (
    <div className="relative">
      <button onClick={() => setAbierto(!abierto)} className="relative border border-borde text-texto px-3 py-2 text-xs hover:bg-fondo">
        Alertas
        {sinLeer > 0 && <span className="absolute -top-2 -right-2 bg-primario text-fondo text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{sinLeer}</span>}
      </button>
      {abierto && (
        <div className="absolute right-0 mt-2 w-72 border border-borde bg-panel p-3 flex flex-col gap-2 z-10 max-h-80 overflow-auto">
          {!notificaciones.length && <p className="text-xs text-mutado">Sin notificaciones por ahora</p>}
          {notificaciones.map((n) => (
            <div key={n.id} onClick={() => alMarcarLeida(n.id)} className={`text-xs border border-borde p-2 cursor-pointer ${n.leido ? 'text-mutado' : 'text-texto'}`}>
              {n.mensaje}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
