import { FiltrosFirstpc } from '../components/pedidos/filtros_firstpc'
import { GrillaProductosFirstpc } from '../components/catalogo/grilla_productos_firstpc'
import { PaginacionProductos } from '../components/pedidos/paginacion_productos'

export function SeccionCatalogoClienteFirstpc({ catalogo, al_agregar }) {
  return <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black tracking-[0.25em] text-primario">GENESIS HARDWARE COMPONENTES</p><h1 className="mt-2 text-4xl font-black tracking-tight text-texto">Catalogo Genesis Hardware</h1><p className="mt-2 max-w-2xl text-sm text-mutado">Explora componentes y arma tu equipo con disponibilidad actualizada.</p></div><span className="rounded-full border border-borde bg-panel px-4 py-2 text-xs font-black tracking-widest text-mutado">{catalogo.filtrados.length} RESULTADOS</span></div><div className="grid gap-8 lg:grid-cols-[280px_1fr]"><FiltrosFirstpc {...catalogo} /><div><GrillaProductosFirstpc productos={catalogo.productos_visibles} favoritos={catalogo.favoritos} al_favorito={catalogo.alternar_favorito} al_agregar={al_agregar} cargando={catalogo.cargando} /><PaginacionProductos pagina={catalogo.pagina} total_paginas={catalogo.total_paginas} al_cambiar={catalogo.set_pagina} /></div></div></main>
}
