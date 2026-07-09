import { TarjetaLineaAdmin } from './tarjeta_linea_admin'

// pos esto funciona para listar todas las lineas de producto en el panel del admin
export function ListaLineas({ lineas, cargando, alSeleccionar, alEliminar }) {
  if (cargando) return <p className="text-xs text-mutado">Cargando lineas...</p>
  if (!lineas.length) return <p className="text-xs text-mutado">Sin lineas registradas aun</p>

  return (
    <div className="flex flex-col gap-2">
      {lineas.map(l => (
        <TarjetaLineaAdmin key={l.id} linea={l} alSeleccionar={alSeleccionar} alEliminar={alEliminar} />
      ))}
    </div>
  )
}
