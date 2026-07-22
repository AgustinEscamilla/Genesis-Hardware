// pos esto funciona yo renderizo filtros laterales controlados por categoria activa
export function ClienteFiltrosCatalogo({ categoria, categorias, alCambiarCategoria }) {
  return (
    <aside className="w-60 border border-borde bg-panel p-3 flex flex-col gap-4">
      <p className="text-sm text-texto font-semibold">Filtros</p>
      <div className="border border-borde p-3 flex flex-col gap-2">
        <p className="text-xs tracking-widest text-mutado">CATEGORIA</p>
        {categorias.map((c) => (
          <label key={c} className="text-xs text-texto flex gap-2">
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
