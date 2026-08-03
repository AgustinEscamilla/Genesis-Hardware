import { categorias_firstpc, marcas_firstpc, obtener_marca_producto } from '../services/constantes_firstpc'

export function FiltrosFirstpc(props) {
  const { productos, busqueda, set_busqueda, categoria, set_categoria, marca, set_marca,
    orden, set_orden, limpiar_filtros } = props
  const campo = 'w-full rounded-lg border border-borde bg-fondo p-2.5 text-sm text-texto outline-none focus:border-primario'
  return <aside className="h-fit space-y-6 rounded-xl border border-borde bg-panel p-5 text-texto lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
    <input value={busqueda} onChange={(e) => set_busqueda(e.target.value)} placeholder="Procesadores ASUS RTX 4090" className={`${campo} pl-3`} />
    <div><p className="text-xs font-black tracking-widest text-primario">CATEGORIAS</p><p className="mt-1 text-xs text-mutado">13 familias del inventario</p><div className="mt-4 space-y-1">
      <button onClick={() => set_categoria('Todas')} className={`w-full rounded-lg px-3 py-2 text-left text-sm ${categoria === 'Todas' ? 'bg-primario text-fondo' : 'text-mutado hover:bg-fondo'}`}>◈ Todos</button><button onClick={() => set_categoria('Favoritos')} className={`w-full rounded-lg px-3 py-2 text-left text-sm ${categoria === 'Favoritos' ? 'bg-primario text-fondo' : 'text-mutado hover:bg-fondo'}`}>♥ Mis favoritos</button>
      {categorias_firstpc.map((item) => <button key={item} onClick={() => set_categoria(item)} className={`w-full rounded-lg px-3 py-2 text-left text-sm ${categoria === item ? 'bg-primario text-fondo' : 'text-mutado hover:bg-fondo'}`}>◈ {item}</button>)}
    </div></div>
    <div><p className="text-xs font-black tracking-widest text-primario">MARCAS</p><div className="mt-3 space-y-2">{marcas_firstpc.map((item) => <label key={item} className="flex items-center justify-between text-sm text-mutado"><span className="flex items-center gap-2"><input type="checkbox" checked={marca === item} onChange={() => set_marca(marca === item ? 'Todas' : item)} className="accent-primario" />{item}</span><span className="text-xs">{productos.filter((producto) => obtener_marca_producto(producto) === item).length}</span></label>)}</div></div>
    <label className="block text-xs font-black tracking-widest text-primario">ORDENAR PRECIOS<select value={orden} onChange={(e) => set_orden(e.target.value)} className={`${campo} mt-2 font-normal`}><option value="relevantes">Mas relevantes</option><option value="menor">Precio menor a mayor</option><option value="mayor">Precio mayor a menor</option></select></label>
    <button onClick={limpiar_filtros} className="w-full rounded-lg border border-primario py-3 text-xs font-black tracking-widest text-primario hover:bg-primario hover:text-fondo">LIMPIAR FILTROS</button>
  </aside>
}
