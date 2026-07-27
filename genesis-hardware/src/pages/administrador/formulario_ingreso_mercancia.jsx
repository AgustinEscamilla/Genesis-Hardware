const categorias_ingreso = ['Procesadores', 'Memoria RAM', 'Tarjetas de video', 'Discos duros', 'SSD', 'Ventiladores']

const estilo_modo = 'flex-1 border px-3 py-2 text-xs transition-colors'

export function FormularioIngresoMercancia({ forma, catalogo = [], cambiar, enviar, guardando, mensaje }) {
  const es_nuevo = forma.modo_ingreso === 'nuevo'
  const clase_activa = 'border-primario bg-primario text-fondo'
  const clase_inactiva = 'border-borde text-mutado hover:border-primario hover:text-primario'

  return (
    <form onSubmit={e => { e.preventDefault(); enviar() }} className="flex max-w-md flex-col gap-4">
      <div className="flex gap-2">
        <button type="button" onClick={() => cambiar('modo_ingreso', 'catalogo')} className={`${estilo_modo} ${es_nuevo ? clase_inactiva : clase_activa}`}>Usar producto existente</button>
        <button type="button" onClick={() => cambiar('modo_ingreso', 'nuevo')} className={`${estilo_modo} ${es_nuevo ? clase_activa : clase_inactiva}`}>Agregar producto nuevo</button>
      </div>
      {es_nuevo ? <>
        <input value={forma.nombre_producto} onChange={e => cambiar('nombre_producto', e.target.value)} placeholder="Nombre del producto nuevo" required className="border border-borde bg-fondo px-3 py-2 text-xs text-texto" />
        <select value={forma.categoria} onChange={e => cambiar('categoria', e.target.value)} className="border border-borde bg-fondo px-3 py-2 text-xs text-texto">{categorias_ingreso.map(categoria => <option key={categoria} value={categoria}>{categoria}</option>)}</select>
        <textarea value={forma.descripcion_tecnica} onChange={e => cambiar('descripcion_tecnica', e.target.value)} placeholder="Descripcion tecnica del producto" rows="3" className="resize-none border border-borde bg-fondo px-3 py-2 text-xs text-texto" />
      </> : <select value={forma.productoId} onChange={e => cambiar('productoId', e.target.value)} required className="border border-borde bg-fondo px-3 py-2 text-xs text-texto"><option value="">Selecciona un producto del catalogo</option>{catalogo.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}</select>}
      <input type="number" min="1" value={forma.volumen} onChange={e => cambiar('volumen', e.target.value)} placeholder="Volumen (cantidad) obligatorio" required className="border border-borde bg-fondo px-3 py-2 text-xs text-texto" />
      <select value={forma.tipoUnidad} onChange={e => cambiar('tipoUnidad', e.target.value)} required className="border border-borde bg-fondo px-3 py-2 text-xs text-texto"><option value="pieza">Pieza</option><option value="tipo docena">Tipo docena</option></select>
      <button type="submit" disabled={guardando} className="border border-primario px-4 py-2 text-xs text-primario transition-colors hover:bg-primario hover:text-fondo disabled:opacity-50">{guardando ? 'Guardando...' : es_nuevo ? 'Agregar y registrar mercancia' : 'Registrar mercancia'}</button>
      {mensaje && <p className="text-xs text-primario">{mensaje}</p>}
    </form>
  )
}
