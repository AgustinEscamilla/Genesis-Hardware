const categorias = ['Todos', 'Tarjetas de video', 'Memoria RAM', 'Procesadores', 'Discos duros', 'SSD', 'Ventiladores']

// aqui maestro yo presento los filtros del catalogo y el boton de datos de prueba
export function FiltrosCatalogoAdministrador({ busqueda, categoria, setBusqueda, setCategoria, onSembrar }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3 items-center">
        <h2 className="text-xs uppercase tracking-widest text-primario">Edicion de catalogo</h2>
        <button onClick={onSembrar} className="border border-primario text-primario text-xs px-3 py-2 hover:bg-primario hover:text-fondo transition-colors">
          Sembrar datos de hardware
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar componente" className="bg-fondo border border-borde text-texto px-3 py-2 text-xs flex-1" />
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="bg-fondo border border-borde text-texto px-3 py-2 text-xs">
          {categorias.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
    </div>
  )
}
