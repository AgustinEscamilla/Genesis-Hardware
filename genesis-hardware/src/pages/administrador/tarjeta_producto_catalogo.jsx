// aqui maestro yo muestro una tarjeta de producto del catalogo con boton para editarlo
export function TarjetaProductoCatalogo({ producto, alSeleccionar }) {
  return (
    <div className="border border-borde bg-panel p-3 flex flex-col gap-2">
      <p className="text-xs uppercase tracking-wide text-primario">{producto.nombre}</p>
      {producto.imagen && (
        <img src={producto.imagen} alt={producto.nombre} className="w-full h-24 object-cover" />
      )}
      <p className="text-xs text-mutado truncate">{producto.descripcionPrecios}</p>
      <button
        onClick={() => alSeleccionar(producto)}
        className="mt-auto text-xs px-3 py-1 border border-primario text-primario hover:bg-primario hover:text-fondo transition-colors"
      >
        Editar
      </button>
    </div>
  )
}
