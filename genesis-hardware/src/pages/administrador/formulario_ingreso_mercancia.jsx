// aqui maestro yo armo el formulario ligado al catalogo por id para evitar cruces por nombre
export function FormularioIngresoMercancia({ forma, catalogo = [], cambiar, enviar, guardando, mensaje }) {
  return (
    <form onSubmit={e => { e.preventDefault(); enviar() }} className="flex flex-col gap-4 max-w-md">
      <select
        value={forma.productoId}
        onChange={e => cambiar('productoId', e.target.value)}
        required
        className="bg-fondo border border-borde text-texto px-3 py-2 text-xs"
      >
        <option value="">Selecciona un producto del catalogo</option>
        {catalogo.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
      </select>
      <input
        type="number"
        min="1"
        value={forma.volumen}
        onChange={e => cambiar('volumen', e.target.value)}
        placeholder="Volumen (cantidad) obligatorio"
        required
        className="bg-fondo border border-borde text-texto px-3 py-2 text-xs"
      />
      <select
        value={forma.tipoUnidad}
        onChange={e => cambiar('tipoUnidad', e.target.value)}
        required
        className="bg-fondo border border-borde text-texto px-3 py-2 text-xs"
      >
        <option value="pieza">Pieza</option>
        <option value="tipo docena">Tipo docena</option>
      </select>
      <button type="submit" disabled={guardando} className="border border-primario text-primario text-xs px-4 py-2 hover:bg-primario hover:text-fondo disabled:opacity-50 transition-colors">
        {guardando ? 'Guardando...' : 'Registrar mercancia'}
      </button>
      {mensaje && <p className="text-xs text-primario">{mensaje}</p>}
    </form>
  )
}
