import { ClienteTarjetaCatalogo } from './cliente_tarjeta_catalogo'
import { ControlesPaginacion } from '../components/controles_paginacion'

// maestro funciona asi yo agrupo tarjetas paginacion y encabezado del catalogo cliente
export function ClienteGrillaCatalogo({ productos, cargando, alAgregar, pagina, hayAnterior, haySiguiente, alAnterior, alSiguiente }) {
  if (cargando) return <p className="text-xs text-mutado">Cargando catalogo...</p>

  return (
    <section className="flex-1 border border-borde bg-fondo p-5 flex flex-col gap-4">
      <div>
        <h1 className="text-5xl font-black text-texto">Catalogo</h1>
        <p className="text-sm text-mutado">Mostrando stock disponible</p>
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
