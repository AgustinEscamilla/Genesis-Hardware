// aqui maestro yo documente este archivo para mantener trazabilidad
export function TarjetaCatalogoEmpleado({ producto, alAgregar }) {
  return (
    <div className="border border-borde bg-panel p-3 flex flex-col gap-2">
      {producto.imagen
        ? <img src={producto.imagen} alt={producto.nombre} className="h-24 w-full object-cover" />
        : <div className="h-24 bg-fondo border border-borde" />
      }
      <p className="text-sm text-texto font-semibold">{producto.nombre}</p>
      <p className="text-xs text-mutado line-clamp-2">{producto.descripcionPrecios}</p>
      <button onClick={() => alAgregar(producto)} className="text-xs border border-primario text-primario px-3 py-1 hover:bg-primario hover:text-fondo transition-colors">
        Agregar
      </button>
    </div>
  )
}
