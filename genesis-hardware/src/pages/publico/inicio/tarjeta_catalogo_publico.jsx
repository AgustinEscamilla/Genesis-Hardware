// aqui maestro yo muestro una tarjeta de producto publico con imagen y descripcion de precios
export function TarjetaCatalogoPublico({ producto }) {
  return (
    <div className="border border-borde bg-panel flex flex-col overflow-hidden">
      {producto.imagen
        ? <img src={producto.imagen} alt={producto.nombre} className="w-full h-40 object-cover" />
        : <div className="w-full h-40 bg-fondo flex items-center justify-center text-xs text-mutado">Sin imagen</div>
      }
      <div className="p-4 flex flex-col gap-2">
        <p className="text-sm font-bold text-texto">{producto.nombre}</p>
        <p className="text-xs text-mutado leading-relaxed whitespace-pre-line">{producto.descripcionPrecios}</p>
      </div>
    </div>
  )
}
