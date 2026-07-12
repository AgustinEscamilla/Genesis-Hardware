// pos esto funciona yo renderizo filtros laterales con estilo de panel catalogo
export function ClienteFiltrosCatalogo() {
  const categorias = ['Procesadores', 'Placas Base', 'Memoria RAM', 'Almacenamiento']
  const sockets = ['LGA 1700', 'AM5', 'AM4']

  return (
    <aside className="w-60 border border-borde bg-panel p-3 flex flex-col gap-4">
      <p className="text-sm text-texto font-semibold">Filtros</p>
      <div className="border border-borde p-3 flex flex-col gap-2">
        <p className="text-xs tracking-widest text-mutado">CATEGORIA</p>
        {categorias.map((c, i) => <label key={c} className="text-xs text-texto flex gap-2"><input type="checkbox" defaultChecked={i === 0} />{c}</label>)}
      </div>
      <div className="border border-borde p-3 flex flex-col gap-2">
        <p className="text-xs tracking-widest text-mutado">SOCKET</p>
        {sockets.map((s, i) => <label key={s} className="text-xs text-texto flex gap-2"><input type="checkbox" defaultChecked={i === 0} />{s}</label>)}
      </div>
      <button className="mt-auto border border-borde text-xs text-texto px-3 py-2 hover:border-primario">RESET FILTROS</button>
    </aside>
  )
}
