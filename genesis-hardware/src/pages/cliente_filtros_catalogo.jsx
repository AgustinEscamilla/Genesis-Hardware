// pos esto funciona yo renderizo filtros laterales controlados por categoria activa
export function ClienteFiltrosCatalogo({ categoria, categorias, alCambiarCategoria }) {
  return (
    <aside className="flex w-full flex-col gap-4 border border-borde bg-panel p-4 lg:w-60 lg:shrink-0">
      <div><p className="text-[10px] font-bold uppercase tracking-widest text-primario">Explorar</p><p className="mt-1 text-sm font-semibold text-texto">Filtrar catalogo</p></div>
      <div className="border border-borde p-3 flex flex-col gap-2">
        <p className="text-xs tracking-widest text-mutado">CATEGORIA</p>
        {categorias.map((c) => (
          <label key={c} className="flex gap-2 rounded px-2 py-2 text-xs text-texto transition-colors hover:bg-fondo">
            <input type="radio" name="categoria" checked={categoria === c} onChange={() => alCambiarCategoria(c)} />
            {c}
          </label>
        ))}
      </div>
      <button onClick={() => alCambiarCategoria('Todos')} className="mt-auto border border-borde text-xs text-texto px-3 py-2 hover:border-primario">
        REINICIAR FILTROS
      </button>
    </aside>
  )
}
