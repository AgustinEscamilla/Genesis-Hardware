import { ClienteTarjetaCatalogo } from './cliente_tarjeta_catalogo'
import { ControlesPaginacion } from '../components/controles_paginacion'

// maestro funciona asi yo agrupo tarjetas paginacion y encabezado del catalogo cliente
export function ClienteGrillaCatalogo({ productos, cargando, alAgregar, pagina, hayAnterior, haySiguiente, alAnterior, alSiguiente }) {
  if (cargando) return <p className="text-xs text-mutado">Cargando catalogo...</p>

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-5 border border-borde bg-fondo p-4 md:p-6">
      <div className="flex flex-col gap-2 border-b border-borde pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-[10px] font-bold uppercase tracking-widest text-primario">Catalogo cliente</p><h1 className="text-3xl font-black text-texto">Componentes disponibles</h1><p className="text-sm text-mutado">Agrega productos al carrito para comenzar tu pedido</p></div>
        <span className="text-xs text-mutado">{productos.length} resultados</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {productos.map((p) => <ClienteTarjetaCatalogo key={p.id} producto={p} alAgregar={alAgregar} />)}
      </div>
      {productos.length === 0 && (
        <p className="text-xs text-mutado border border-borde bg-panel p-3">
          No hay productos disponibles por ahora
        </p>
      )}
      <ControlesPaginacion pagina={pagina} hay_anterior={hayAnterior} hay_siguiente={haySiguiente} al_anterior={alAnterior} al_siguiente={alSiguiente} />
    </section>
  )
}
