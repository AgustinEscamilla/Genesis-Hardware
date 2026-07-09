// aqui maestro yo muestro una linea de producto con botones editar y eliminar
export function TarjetaLineaAdmin({ linea, alSeleccionar, alEliminar }) {
  return (
    <div className="border border-borde bg-panel p-3 flex justify-between items-start gap-2">
      <div className="flex flex-col gap-1 min-w-0">
        <p className="text-xs text-primario uppercase tracking-wide truncate">{linea.titulo}</p>
        <p className="text-xs text-mutado">{linea.etiqueta} — {linea.metrica}: {linea.valor}</p>
      </div>
      <div className="flex gap-2 shrink-0">
        <button onClick={() => alSeleccionar(linea)} className="text-xs border border-borde text-texto px-2 py-1 hover:border-primario hover:text-primario transition-colors">
          Editar
        </button>
        <button onClick={() => alEliminar(linea.id)} className="text-xs border border-borde text-texto px-2 py-1 hover:bg-red-700 hover:border-red-700 transition-colors">
          Eliminar
        </button>
      </div>
    </div>
  )
}
