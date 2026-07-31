import { useCatalogoPublico } from '../../../hooks/use_catalogo_publico'
import { TarjetaCatalogoPublico } from './tarjeta_catalogo_publico'

// aqui maestro yo renderizo la seccion del catalogo con datos dinamicos desde firestore
export function SeccionCatalogo() {
  const { productos, cargando } = useCatalogoPublico()

  return (
    <section id="catalogo" className="mx-auto max-w-7xl border-t border-borde px-4 py-20 md:px-8">
      <div className="mb-10 flex flex-col gap-4 border-b border-borde pb-5 md:flex-row md:items-end md:justify-between">
        <div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-primario">Disponibilidad en tiempo real</p><h2 className="text-3xl font-black text-texto">Catalogo <span className="texto-degradado">destacado</span></h2><p className="mt-2 text-sm text-mutado">Consulta productos disponibles antes de iniciar sesion</p></div>
        <div className="flex flex-wrap items-center gap-3"><span className="flex items-center gap-2 rounded-full border border-terciario/30 bg-terciario/10 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-terciario"><span className="h-2 w-2 rounded-full bg-terciario" /> Stock actualizado</span><span className="text-xs font-semibold text-mutado">{productos.length} productos visibles</span></div>
      </div>
      {cargando && <p className="text-xs text-mutado">Cargando catalogo...</p>}
      {!cargando && !productos.length && <p className="rounded-xl border border-borde bg-panel p-4 text-xs text-mutado">El catalogo se encuentra en preparacion</p>}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {productos.map(p => <TarjetaCatalogoPublico key={p.id} producto={p} />)}
      </div>
    </section>
  )
}
