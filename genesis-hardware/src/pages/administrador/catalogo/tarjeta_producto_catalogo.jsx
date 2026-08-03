import { ImagenProductoFirstpc } from '../../../components/imagen_producto_firstpc'

// aqui maestro yo muestro una tarjeta de producto del catalogo con boton para editarlo
export function TarjetaProductoCatalogo({ producto, alSeleccionar, alEliminar }) {
  return (
    <div className="border border-borde bg-panel p-3 flex flex-col gap-2">
      <p className="text-xs uppercase tracking-wide text-primario">{producto.nombre}</p>
      <p className="text-[10px] uppercase tracking-wide text-texto">{producto.categoria}</p>
      <div className="h-24 w-full overflow-hidden rounded border border-borde bg-slate-950"><ImagenProductoFirstpc producto={producto} className="h-full w-full object-contain" /></div>
      <p className="text-xs text-mutado truncate">{producto.descripcionTecnica || producto.descripcionPrecios}</p>
      <p className="text-[10px] text-texto">Stock {producto.stockVisible ?? 0}</p>
      <div className="mt-auto flex gap-2">
        <button onClick={() => alSeleccionar(producto)} className="flex-1 text-xs px-3 py-1 border border-primario text-primario hover:bg-primario hover:text-fondo transition-colors">Editar</button>
        <button onClick={() => alEliminar(producto.id)} className="flex-1 text-xs px-3 py-1 border border-borde text-texto hover:bg-red-700 hover:border-red-700 transition-colors">Eliminar</button>
      </div>
    </div>
  )
}
