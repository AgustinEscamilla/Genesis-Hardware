// aqui maestro yo muestro una tarjeta de producto publico con imagen y descripcion de precios
import { formatear_precio } from '../../../services/formato_moneda'

export function TarjetaCatalogoPublico({ producto }) {
  const imagen_valida = producto.imagen && !producto.imagen.includes('via.placeholder.com')
  return (
    <article className="group flex flex-col overflow-hidden border border-borde bg-panel transition-all hover:-translate-y-1 hover:border-primario/60 hover:shadow-xl hover:shadow-black/20">
      {imagen_valida
        ? <img src={producto.imagen} alt={producto.nombre} className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        : <div className="flex h-44 w-full items-center justify-center bg-fondo text-xs text-mutado">Sin imagen</div>
      }
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3"><p className="text-sm font-bold text-texto">{producto.nombre}</p><span className="text-primario">↗</span></div>
        <p className="text-xs leading-5 text-mutado">{producto.descripcionPrecios}</p>
        <div className="mt-auto flex items-center justify-between border-t border-borde pt-3"><span className="text-xs text-mutado">Stock {Number(producto.stockVisible || 0)}</span><span className="text-sm font-black text-texto">{formatear_precio(producto.precio)}</span></div>
      </div>
    </article>
  )
}
