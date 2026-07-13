// aqui maestro yo armo el formulario con volumen obligatorio y selector de tipo de unidad de venta
export function FormularioIngresoMercancia({ forma, cambiar, enviar, guardando, mensaje }) {
  return (
    <form onSubmit={e => { e.preventDefault(); enviar() }} className="flex flex-col gap-4 max-w-md">
      <input
        value={forma.nombre}
        onChange={e => cambiar('nombre', e.target.value)}
        placeholder="Nombre del articulo"
        className="bg-fondo border border-borde text-texto px-3 py-2 text-xs"
      />
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
