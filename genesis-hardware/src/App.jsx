import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { VistaLogin } from './pages/empleados/acceso/vista_login'
import { VistaPrincipal } from './pages/empleados/produccion/vista_principal'
import { PlantillaEmpleados } from './pages/empleados/plantilla_empleados'

// maestro funciona asi este archivo sirve como indice para unir todos los modulos
export function App() {
  return (
    // esto sirve para envolver todo en el navegador y manejar las rutas
    <BrowserRouter>
      <Routes>
        // aqui puse profe la ruta principal con prioridad para que cargue el menu
        <Route element={<PlantillaEmpleados />}>
          <Route path="/" element={<VistaPrincipal />} />
        </Route>
        
        // pos esto funciona para enviar al usuario al login si no tiene acceso
        <Route path="/login" element={<VistaLogin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App