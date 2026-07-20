// aqui maestro yo documente este archivo para mantener trazabilidad
import { BrowserRouter } from 'react-router-dom'
import { ProveedorAutenticacion } from './context/proveedor_autenticacion'
import { RutasApp } from './pages/rutas_app'

export function App() {
  return (
    <ProveedorAutenticacion>
      <BrowserRouter>
        <RutasApp />
      </BrowserRouter>
    </ProveedorAutenticacion>
  )
}

export default App