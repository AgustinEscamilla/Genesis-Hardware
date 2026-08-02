import { Link } from 'react-router-dom'
import { obtener_marca_producto } from '../services/constantes_firstpc'

export function TarjetaProductoFirstpc({ producto, favorito, al_favorito, al_agregar }) {
  const precio = Number(producto.precio || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
  return <article className="group relative flex flex-col overflow-hidden border border-borde bg-panel p-3 text-texto transition hover:-translate-y-1 hover:border-primario/60">
    <Link to={`/componentes/${producto.id}`} className="flex h-40 items-center justify-center bg-fondo p-4">{producto.imagen ? <img src={producto.imagen} alt={producto.nombre} className="h-full w-full object-contain" /> : <span className="text-4xl text-mutado">▣</span>}</Link>
    <div className="flex flex-1 flex-col p-2"><p className="mt-2 text-[10px] font-black tracking-widest text-mutado">{obtener_marca_producto(producto)}</p><Link to={`/componentes/${producto.id}`} className="mt-1 line-clamp-2 min-h-10 text-sm font-bold">{producto.nombre}</Link><p className="mt-1 text-xs text-mutado">{producto.categoria || 'Componentes'}</p><p className="mt-3 text-xs text-primario">★★★★★ <span className="text-mutado">(0)</span></p>
      <div className="mt-auto flex flex-col gap-3 border-t border-borde pt-3"><div><p className="text-[10px] font-bold tracking-widest text-mutado">PRECIO</p><p className="text-lg font-black text-texto">{precio}</p></div><div className="flex w-full items-center gap-2"><button type="button" onClick={() => al_favorito(producto.id)} className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-borde text-xl transition hover:border-red-500 ${favorito ? 'bg-red-500/15 text-red-500' : 'text-mutado hover:text-red-500'}`} aria-label={favorito ? 'Quitar de favoritos' : 'Guardar en favoritos'}>{favorito ? '♥' : '♡'}</button><button type="button" onClick={() => al_agregar(producto)} className="flex h-10 min-w-0 flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-full bg-primario px-3 font-black text-fondo shadow-lg shadow-primario/20 transition hover:scale-[1.02]" aria-label="Agregar al carrito"><span className="text-lg leading-none">+</span><span className="text-[10px] uppercase tracking-wide">Agregar al carrito</span></button></div></div>
    </div>
  </article>
}
