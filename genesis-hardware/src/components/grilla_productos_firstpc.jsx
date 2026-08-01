import { TarjetaProductoFirstpc } from './tarjeta_producto_firstpc'

export function GrillaProductosFirstpc({ productos, favoritos, al_favorito, al_agregar, cargando }) {
  if (cargando) return <p className="rounded-2xl bg-white p-6 text-sm text-slate-500">Cargando componentes...</p>
  if (!productos.length) return <p className="rounded-2xl bg-white p-6 text-sm text-slate-500">No encontramos productos con esos filtros.</p>
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">{productos.map((producto) => <TarjetaProductoFirstpc key={producto.id} producto={producto} favorito={favoritos.includes(producto.id)} al_favorito={al_favorito} al_agregar={al_agregar} />)}</div>
}
