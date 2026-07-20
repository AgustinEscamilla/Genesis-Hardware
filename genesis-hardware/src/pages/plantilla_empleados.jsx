// aqui maestro yo documente este archivo para mantener trazabilidad
import { Outlet } from 'react-router-dom'
import { RutaProtegida } from '../components/ruta_protegida'
import { ContenedorPrincipal } from '../components/contenedor_principal'
import { BarraNavegacionEmpleado } from '../components/barra_navegacion_empleado'

export function PlantillaEmpleados() {
  return (
    <RutaProtegida>
      <ContenedorPrincipal>
        <BarraNavegacionEmpleado />
        <Outlet />
      </ContenedorPrincipal>
    </RutaProtegida>
  )
}