import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { VistaPrincipalAdministrador } from './pages/administrador/vista_principal'
import { VistaCrearCuentasAdministrador } from './pages/administrador/vista_crear_cuentas_administrador'
import { VistaTablasAdministrador } from './pages/administrador/vista_tablas_administrador'
import { VistaPrincipalCliente } from './pages/clientes/vista_principal'
import { VistaPrincipalRepartidor } from './pages/repartidores/vista_principal'
import { VistaAutenticacion } from './pages/autenticacion/vista_autenticacion'
import { VistaInicio } from './pages/publico/inicio/vista_inicio'
import { VistaPrincipal } from './pages/empleados/produccion/vista_principal'
import { PlantillaEmpleados } from './pages/empleados/plantilla_empleados'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VistaInicio />} />
        <Route path="/autenticacion" element={<VistaAutenticacion />} />
        <Route path="/login" element={<Navigate to="/autenticacion" replace />} />
        <Route path="/empleados/acceso" element={<Navigate to="/autenticacion" replace />} />
        <Route path="/administrador" element={<VistaPrincipalAdministrador />}>
          <Route index element={<Navigate to="tablas" replace />} />
          <Route path="tablas" element={<VistaTablasAdministrador />} />
          <Route path="crear-cuentas" element={<VistaCrearCuentasAdministrador />} />
        </Route>
        <Route path="/admin" element={<Navigate to="/administrador" replace />} />
        <Route path="/clientes" element={<VistaPrincipalCliente />} />
        <Route path="/cliente" element={<Navigate to="/clientes" replace />} />
        <Route path="/repartidores" element={<VistaPrincipalRepartidor />} />
        <Route path="/empleados" element={<PlantillaEmpleados />}>
          <Route index element={<VistaPrincipal />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App