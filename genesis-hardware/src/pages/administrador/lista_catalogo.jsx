import { TarjetaProductoCatalogo } from './tarjeta_producto_catalogo'

// pos esto funciona para renderizar todos los productos del catalogo en una grilla responsive
export function ListaCatalogo({ productos, cargando, alSeleccionar }) {
  if (cargando) return <p className="text-xs text-mutado">Cargando catalogo...</p>
  if (!productos.length) return <p className="text-xs text-mutado">Sin productos registrados aun</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {productos.map(p => (
        <TarjetaProductoCatalogo key={p.id} producto={p} alSeleccionar={alSeleccionar} />
      ))}
    </div>
  )
}
