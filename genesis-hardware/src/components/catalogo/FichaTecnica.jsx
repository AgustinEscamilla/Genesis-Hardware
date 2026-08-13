import { useState } from 'react'
import { useFiltroFichaTecnica } from '../../hooks/use_filtro_ficha_tecnica'
import { GrupoFichaTecnica } from './GrupoFichaTecnica'

// aqui maestro yo armo la ficha tecnica completa con buscador y categorias en acordeon
export function FichaTecnica({ especificaciones_tecnicas }) {
    const [busqueda, set_busqueda] = useState('')
    const grupos = useFiltroFichaTecnica(especificaciones_tecnicas, busqueda)
    const hay_datos = (especificaciones_tecnicas || []).length > 0

    return (
        <section className="rounded-2xl border border-borde bg-panel p-5 shadow-vidrio md:p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-[10px] font-black tracking-[0.2em] text-primario">FICHA TÉCNICA</p>
                    <h2 className="mt-2 text-xl font-black text-texto">Especificaciones técnicas</h2>
                </div>
                <input
                    value={busqueda}
                    onChange={(evento) => set_busqueda(evento.target.value)}
                    placeholder="Buscar característica..."
                    className="w-full rounded-full border border-borde bg-fondo px-4 py-2 text-xs text-texto outline-none focus:border-primario md:w-60"
                />
            </div>
            <div className="mt-5 overflow-hidden rounded-2xl border border-borde">
                {grupos.map((grupo) => (
                    <GrupoFichaTecnica
                        key={grupo.categoria}
                        categoria={grupo.categoria}
                        especificaciones={grupo.especificaciones}
                    />
                ))}
                {(!hay_datos || grupos.length === 0) && (
                    <p className="px-4 py-8 text-center text-xs text-mutado">
                        Sin especificaciones disponibles
                    </p>
                )}
            </div>
        </section>
    )
}
