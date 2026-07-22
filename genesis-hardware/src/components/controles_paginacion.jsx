// pos esto funciona para mostrar los botones reales de anterior y siguiente pagina
export function ControlesPaginacion({ pagina, hay_anterior, hay_siguiente, al_anterior, al_siguiente }) {
    return (
        <div className="flex gap-2 justify-center items-center text-xs text-mutado">
            <button onClick={al_anterior} disabled={!hay_anterior} className="border border-borde px-3 py-1 disabled:opacity-30 hover:border-primario">
                Anterior
            </button>
            <span className="text-texto">Pagina {pagina + 1}</span>
            <button onClick={al_siguiente} disabled={!hay_siguiente} className="border border-borde px-3 py-1 disabled:opacity-30 hover:border-primario">
                Siguiente
            </button>
        </div>
    )
}
