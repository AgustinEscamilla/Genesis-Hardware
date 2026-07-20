import { Navigate, Route, Routes } from 'react-router-dom'
import { VistaAjustesCliente } from './clientes/vista_ajustes_cliente'
import { VistaPrincipalCliente } from './vista_principal_cliente'
import { VistaAutenticacion } from './vista_autenticacion'
import { VistaInicio } from './publico/inicio/vista_inicio'
import { VistaOnboardingEmpleado } from './vista_onboarding_empleado'
import { VistaOnboardingRepartidor } from './vista_onboarding_repartidor'
import { RutasAdministrador } from './rutas_administrador'
import { RutasEmpleados } from './rutas_empleados'
import { RutasRepartidor } from './rutas_repartidor'

// aqui maestro yo agrupo todas las rutas en un unico componente de navegacion
export function RutasApp() {
  return (
    <Routes>
      <Route path="/" element={<VistaInicio />} />
      <Route path="/autenticacion" element={<VistaAutenticacion />} />
      <Route path="/login" element={<Navigate to="/autenticacion" replace />} />
      <Route path="/empleados/acceso" element={<Navigate to="/autenticacion" replace />} />
      <RutasAdministrador />
      <Route path="/clientes" element={<VistaPrincipalCliente />} />
      <Route path="/clientes/ajustes" element={<VistaAjustesCliente />} />
      <Route path="/cliente" element={<Navigate to="/clientes" replace />} />
      <RutasRepartidor />
      <Route path="/onboarding/empleados" element={<VistaOnboardingEmpleado />} />
      <Route path="/onboarding/repartidores" element={<VistaOnboardingRepartidor />} />
      <RutasEmpleados />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default RutasApp
