import { Outlet } from 'react-router-dom'
import { RutaProtegida } from '../../components/ruta_protegida'
import { ContenedorPrincipal } from '../../components/contenedor_principal'

// aqui maestro yo hice el molde que envuelve todas las pantallas de los trabajadores
export function PlantillaEmpleados() {
  return (
    // esto sirve para poner el candado general y el diseño lateral a todas las vistas
    <RutaProtegida>
      <ContenedorPrincipal>
        // aqui puse profe el espacio en blanco donde cargaran las pantallas dinamicas
        <Outlet />
      </ContenedorPrincipal>
    </RutaProtegida>
  )
}