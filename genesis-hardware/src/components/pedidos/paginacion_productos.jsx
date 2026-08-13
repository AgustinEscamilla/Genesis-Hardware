export function PaginacionProductos({ pagina, total_paginas, al_cambiar }) {
  if (total_paginas <= 1) return null
  return <nav className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Paginacion de productos">
    {Array.from({ length: total_paginas }, (_, indice) => indice + 1).map((numero) => <button key={numero} onClick={() => al_cambiar(numero)} className={`h-9 min-w-9 rounded-lg border px-3 text-xs font-bold ${pagina === numero ? 'border-primario bg-primario text-fondo' : 'border-borde bg-panel text-mutado hover:border-primario hover:text-texto'}`}>{numero}</button>)}
  </nav>
}
