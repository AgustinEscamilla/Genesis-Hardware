// aqui maestro yo organizo el proveedor y las rutas de la aplicacion
import { BrowserRouter } from 'react-router-dom'
import { ProveedorAutenticacion } from './context/proveedor_autenticacion'
import { RutasAplicacion } from './pages/rutas_aplicacion'

export function Aplicacion() {
  return (
    <ProveedorAutenticacion>
      <BrowserRouter>
        <RutasAplicacion />
      </BrowserRouter>
    </ProveedorAutenticacion>
  )
}

export default Aplicacion
