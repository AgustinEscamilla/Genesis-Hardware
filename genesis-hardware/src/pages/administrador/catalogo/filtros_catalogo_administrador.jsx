const categorias = ['Todos', 'Tarjetas de video', 'Memoria RAM', 'Procesadores', 'Discos duros', 'SSD NVMe', 'Ventiladores', 'SSD']

// aqui maestro yo presento los filtros reales del catalogo
export function FiltrosCatalogoAdministrador({ busqueda, categoria, setBusqueda, setCategoria }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xs uppercase tracking-widest text-primario">Edicion de catalogo</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar componente" className="bg-fondo border border-borde text-texto px-3 py-2 text-xs flex-1" />
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="bg-fondo border border-borde text-texto px-3 py-2 text-xs">
          {categorias.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
    </div>
  )
}
