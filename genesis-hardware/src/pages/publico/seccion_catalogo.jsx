import { useCatalogoPublico } from '../../hooks/use_catalogo_publico'
import { TarjetaCatalogoPublico } from './tarjeta_catalogo_publico'

// aqui maestro yo renderizo la seccion del catalogo con datos dinamicos desde firestore
export function SeccionCatalogo() {
  const { productos, cargando } = useCatalogoPublico()

  return (
    <section id="catalogo" className="py-20 px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10 border-b border-borde pb-4">
        <div>
          <h2 className="text-2xl font-bold text-texto">Catalogo de Productos</h2>
          <p className="text-mutado text-sm mt-2">Precios y disponibilidad actualizados en tiempo real</p>
        </div>
      </div>
      {cargando && <p className="text-xs text-mutado">Cargando catalogo...</p>}
      {!cargando && !productos.length && <p className="text-xs text-mutado">Catalogo en preparacion</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productos.map(p => <TarjetaCatalogoPublico key={p.id} producto={p} />)}
      </div>
    </section>
  )
}
