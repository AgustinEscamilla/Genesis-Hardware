// aqui maestro yo documente este archivo para mantener trazabilidad
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { VistaPrincipalAdministrador } from './pages/administrador/vista_principal'
import { VistaCrearCuentasAdministrador } from './pages/administrador/cuentas/vista_crear_cuentas_administrador'
import { VistaTablasAdministrador } from './pages/administrador/cuentas/vista_tablas_administrador'
import { VistaCatalogoAdministrador } from './pages/administrador/catalogo/vista_catalogo_administrador'
import { VistaMercanciaAdministrador } from './pages/administrador/vista_mercancia_administrador'
import { VistaLineasAdministrador } from './pages/administrador/lineas/vista_lineas_administrador'
import { VistaPrincipalCliente } from './pages/vista_principal_cliente'
import { VistaPrincipalRepartidor } from './pages/vista_principal_repartidor'
import { VistaAutenticacion } from './pages/vista_autenticacion'
import { VistaInicio } from './pages/publico/inicio/vista_inicio'
import { VistaPrincipal } from './pages/produccion/vista_principal'
import { PlantillaEmpleados } from './pages/plantilla_empleados'
import { VistaOnboardingEmpleado } from './pages/vista_onboarding_empleado'
import { VistaOnboardingRepartidor } from './pages/vista_onboarding_repartidor'

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
          <Route path="catalogo" element={<VistaCatalogoAdministrador />} />
          <Route path="mercancia" element={<VistaMercanciaAdministrador />} />
          <Route path="lineas" element={<VistaLineasAdministrador />} />
        </Route>
        <Route path="/admin" element={<Navigate to="/administrador" replace />} />
        <Route path="/clientes" element={<VistaPrincipalCliente />} />
        <Route path="/cliente" element={<Navigate to="/clientes" replace />} />
        <Route path="/repartidores" element={<VistaPrincipalRepartidor />} />
        <Route path="/onboarding/empleados" element={<VistaOnboardingEmpleado />} />
        <Route path="/onboarding/repartidores" element={<VistaOnboardingRepartidor />} />
        <Route path="/empleados" element={<PlantillaEmpleados />}>
          <Route index element={<VistaPrincipal />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App