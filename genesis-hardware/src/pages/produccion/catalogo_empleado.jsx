// aqui maestro yo documente este archivo para mantener trazabilidad
import { TarjetaCatalogoEmpleado } from './tarjeta_catalogo_empleado'

export function CatalogoEmpleado({ productos, cargando, alAgregar }) {
  if (cargando) return <p className="text-xs text-mutado">Cargando catalogo...</p>
  if (!productos.length) return <p className="text-xs text-mutado">Sin productos disponibles</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {productos.map(p => (
        <TarjetaCatalogoEmpleado key={p.id} producto={p} alAgregar={alAgregar} />
      ))}
    </div>
  )
}
