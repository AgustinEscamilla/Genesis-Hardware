// aqui maestro yo documente este archivo para mantener trazabilidad
import { useState } from 'react'

export function AlertaStockAdmin({ alertas }) {
  const [abierto, setAbierto] = useState(false)
  if (!alertas.length) return null

  return (
    <>
      <button type="button" onClick={() => setAbierto(true)} className="relative border border-primario/60 bg-primario/10 px-3 py-2 text-xs font-bold uppercase tracking-wide text-primario transition-colors hover:bg-primario hover:text-fondo">
        Stock bajo
        <span className="absolute -top-2 -right-2 bg-primario text-fondo text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{alertas.length}</span>
      </button>
      {abierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={() => setAbierto(false)}>
          <div onClick={(evento) => evento.stopPropagation()} className="flex max-h-[80vh] w-full max-w-md flex-col gap-2 overflow-auto rounded-xl border border-borde bg-panel p-4 shadow-vidrio">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-sm font-bold uppercase tracking-widest text-primario">Atencion requerida</p>
              <button type="button" onClick={() => setAbierto(false)} className="text-xs text-mutado hover:text-texto">Cerrar</button>
            </div>
            <p className="text-xs text-mutado">Hay componentes por debajo del minimo configurado</p>
            {alertas.map(a => (
              <p key={a.id} className="border border-borde p-2 text-xs text-texto">
                {a.nombreProducto} en minimo {a.volumen} de {a.stockMinimo}
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
