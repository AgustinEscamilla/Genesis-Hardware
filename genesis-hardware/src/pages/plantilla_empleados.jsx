// aqui maestro yo documente este archivo para mantener trazabilidad
import { Outlet } from 'react-router-dom'
import { RutaProtegida } from '../components/estructura/ruta_protegida'
import { ContenedorPrincipal } from '../components/estructura/contenedor_principal'
import { BarraNavegacionEmpleado } from '../components/navegacion/barra_navegacion_empleado'

export function PlantillaEmpleados() {
  return (
    <RutaProtegida rolPermitido="empleado">
      <ContenedorPrincipal navbar={<BarraNavegacionEmpleado />}>
        <Outlet />
      </ContenedorPrincipal>
    </RutaProtegida>
  )
}