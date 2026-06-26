import { Outlet } from 'react-router-dom'
import { RutaProtegida } from '../../components/ruta_protegida'
import { ContenedorPrincipal } from '../../components/contenedor_principal'

export function PlantillaEmpleados() {
  return (
    <RutaProtegida>
      <ContenedorPrincipal>
        <Outlet />
      </ContenedorPrincipal>
    </RutaProtegida>
  )
}