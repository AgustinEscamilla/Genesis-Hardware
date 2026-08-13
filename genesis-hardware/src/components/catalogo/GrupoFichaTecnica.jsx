import { useState } from 'react'

// esto sirve para mostrar una categoria de especificaciones con su acordeon
export function GrupoFichaTecnica({ categoria, especificaciones }) {
    const [abierto, set_abierto] = useState(true)

    return (
        <div className="border-t border-borde first:border-t-0">
            <button
                type="button"
                onClick={() => set_abierto((valor) => !valor)}
                className="flex w-full items-center justify-between bg-fondo/60 px-4 py-3 text-left transition hover:bg-fondo"
            >
                <span className="text-xs font-black uppercase tracking-wide text-texto">{categoria}</span>
                <span className="text-sm font-black text-primario">{abierto ? '−' : '+'}</span>
            </button>
            {abierto && especificaciones.map((item, indice) => (
                <div
                    key={`${categoria}-${item.clave}`}
                    className={`flex items-center justify-between gap-4 border-t border-borde px-4 py-3 text-xs ${indice % 2 === 0 ? 'bg-panel' : 'bg-fondo/30'}`}
                >
                    <span className="text-terciario">{item.clave}</span>
                    <span className="text-right font-bold text-texto">{item.valor}</span>
                </div>
            ))}
        </div>
    )
}
