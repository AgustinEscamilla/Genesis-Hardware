import { Navigate, Route, Routes } from 'react-router-dom'
import { VistaAjustesCliente } from './clientes/vista_ajustes_cliente'
import { VistaReclamoPedido } from './clientes/vista_reclamo_pedido'
import { VistaPrincipalCliente } from './vista_principal_cliente'
import { VistaAutenticacion } from './vista_autenticacion'
import { VistaInicio } from './publico/inicio/vista_inicio'
import { VistaOnboardingEmpleado } from './vista_onboarding_empleado'
import { VistaOnboardingRepartidor } from './vista_onboarding_repartidor'
import { RutasAdministrador } from './rutas_administrador'
import { RutasEmpleados } from './rutas_empleados'
import { RutasRepartidor } from './rutas_repartidor'
import { RutaProtegida } from '../components/ruta_protegida'

// aqui maestro yo agrupo todas las rutas en un unico componente de navegacion
export function RutasApp() {
  return (
    <Routes>
      <Route path="/" element={<VistaInicio />} />
      <Route path="/autenticacion" element={<VistaAutenticacion />} />
      <Route path="/login" element={<Navigate to="/autenticacion" replace />} />
      <Route path="/empleados/acceso" element={<Navigate to="/autenticacion" replace />} />
      {RutasAdministrador()}
      <Route path="/clientes" element={<RutaProtegida rolPermitido="cliente"><VistaPrincipalCliente /></RutaProtegida>} />
      <Route path="/clientes/ajustes" element={<RutaProtegida rolPermitido="cliente"><VistaAjustesCliente /></RutaProtegida>} />
      <Route path="/clientes/reclamos" element={<RutaProtegida rolPermitido="cliente"><VistaReclamoPedido /></RutaProtegida>} />
      <Route path="/cliente" element={<Navigate to="/clientes" replace />} />
      {RutasRepartidor()}
      <Route path="/onboarding/empleados" element={<RutaProtegida rolPermitido="empleado"><VistaOnboardingEmpleado /></RutaProtegida>} />
      <Route path="/onboarding/repartidores" element={<RutaProtegida rolPermitido="repartidor"><VistaOnboardingRepartidor /></RutaProtegida>} />
      {RutasEmpleados()}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default RutasApp
