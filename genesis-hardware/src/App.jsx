import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { VistaPrincipalAdministrador } from './pages/administrador/vista_principal'
import { VistaCrearCuentasAdministrador } from './pages/administrador/vista_crear_cuentas_administrador'
import { VistaTablasAdministrador } from './pages/administrador/vista_tablas_administrador'
import { VistaPrincipalCliente } from './pages/clientes/vista_principal'
import { VistaInicio } from './pages/publico/inicio/vista_inicio'
import { VistaLogin } from './pages/empleados/acceso/vista_login'
import { VistaPrincipal } from './pages/empleados/produccion/vista_principal'
import { PlantillaEmpleados } from './pages/empleados/plantilla_empleados'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VistaInicio />} />
        <Route path="/login" element={<VistaLogin />} />
        <Route path="/admin" element={<VistaPrincipalAdministrador />}>
          <Route index element={<Navigate to="tablas" replace />} />
          <Route path="tablas" element={<VistaTablasAdministrador />} />
          <Route path="crear-cuentas" element={<VistaCrearCuentasAdministrador />} />
        </Route>
        <Route path="/cliente" element={<VistaPrincipalCliente />} />
        <Route path="/empleados" element={<PlantillaEmpleados />}>
          <Route index element={<VistaPrincipal />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App