import { useCatalogoFirstpc } from '../../hooks/use_catalogo_firstpc'
import { CabeceraFirstpc } from '../../components/cabecera_firstpc'
import { FiltrosFirstpc } from '../../components/filtros_firstpc'
import { GrillaProductosFirstpc } from '../../components/grilla_productos_firstpc'

export function VistaCatalogoFirstpc() {
  const catalogo = useCatalogoFirstpc()
  return <div className="min-h-screen bg-slate-100 text-slate-900"><CabeceraFirstpc carrito={catalogo.carrito} al_buscar={() => document.querySelector('input[placeholder^="Procesadores"]')?.focus()} /><main className="mx-auto max-w-7xl px-4 py-10"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black tracking-[0.25em] text-emerald-600">FIRSTPC COMPONENTES</p><h1 className="mt-2 text-4xl font-black tracking-tight">Catálogo FIRSTPC</h1><p className="mt-2 max-w-2xl text-sm text-slate-500">Un layout de filtros premium para navegar hardware con más velocidad y menos ruido visual.</p></div><span className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-black tracking-widest text-slate-600">{catalogo.filtrados.length} RESULTADOS</span></div><div className="grid gap-8 lg:grid-cols-[280px_1fr]"><FiltrosFirstpc {...catalogo} /><GrillaProductosFirstpc productos={catalogo.filtrados} favoritos={catalogo.favoritos} al_favorito={catalogo.alternar_favorito} al_agregar={() => catalogo.set_carrito((actual) => actual + 1)} cargando={catalogo.cargando} /></div></main></div>
}
