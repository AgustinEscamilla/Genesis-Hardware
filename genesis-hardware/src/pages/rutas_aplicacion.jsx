import { Navigate, Route, Routes } from 'react-router-dom'
import { VistaDiferida } from '../components/vista_diferida'
import { con_ruta_protegida } from '../hoc/con_ruta_protegida'
import { cargar_vista } from '../services/servicio_vistas_diferidas'
import { RutasAdministrador } from './rutas_administrador'
import { RutasEmpleados } from './rutas_empleados'
import { RutasRepartidor } from './rutas_repartidor'

const VistaInicio = cargar_vista(() => import('./publico/inicio/vista_inicio'), 'VistaInicio')
const VistaCatalogoFirstpc = cargar_vista(() => import('./publico/vista_catalogo_firstpc'), 'VistaCatalogoFirstpc')
const VistaDetalleProductoFirstpc = cargar_vista(() => import('./publico/vista_detalle_producto_firstpc'), 'VistaDetalleProductoFirstpc')
const VistaCliente = cargar_vista(() => import('./vista_principal_cliente'), 'VistaPrincipalCliente')
const VistaAjustes = cargar_vista(() => import('./clientes/vista_ajustes_cliente'), 'VistaAjustesCliente')
const VistaReclamo = cargar_vista(() => import('./clientes/vista_reclamo_pedido'), 'VistaReclamoPedido')
const VistaRetornoPago = cargar_vista(() => import('./clientes/vista_retorno_pago'), 'VistaRetornoPago')
const VistaOnboardingEmpleado = cargar_vista(() => import('./vista_onboarding_empleado'), 'VistaOnboardingEmpleado')
const VistaOnboardingRepartidor = cargar_vista(() => import('./vista_onboarding_repartidor'), 'VistaOnboardingRepartidor')
const ClienteProtegido = con_ruta_protegida(VistaCliente, 'cliente')
const AjustesProtegidos = con_ruta_protegida(VistaAjustes, 'cliente')
const ReclamoProtegido = con_ruta_protegida(VistaReclamo, 'cliente')
const RetornoPagoProtegido = con_ruta_protegida(VistaRetornoPago, 'cliente')
const OnboardingEmpleadoProtegido = con_ruta_protegida(VistaOnboardingEmpleado, 'empleado')
const OnboardingRepartidorProtegido = con_ruta_protegida(VistaOnboardingRepartidor, 'repartidor')

const vista = (componente) => <VistaDiferida componente={componente} />

export function RutasAplicacion() {
  return <Routes>
    <Route path="/" element={vista(VistaInicio)} />
    <Route path="/componentes" element={vista(VistaCatalogoFirstpc)} />
    <Route path="/componentes/:id" element={vista(VistaDetalleProductoFirstpc)} />
    <Route path="/autenticacion" element={<Navigate to="/" replace />} />
    <Route path="/login" element={<Navigate to="/" replace />} />
    <Route path="/empleados/acceso" element={<Navigate to="/" replace />} />
    {RutasAdministrador()}
    <Route path="/clientes" element={vista(ClienteProtegido)} />
    <Route path="/clientes/ajustes" element={vista(AjustesProtegidos)} />
    <Route path="/clientes/reclamos" element={vista(ReclamoProtegido)} />
    <Route path="/clientes/pago/retorno" element={vista(RetornoPagoProtegido)} />
    <Route path="/cliente" element={<Navigate to="/clientes" replace />} />
    {RutasRepartidor()}
    <Route path="/onboarding/empleados" element={vista(OnboardingEmpleadoProtegido)} />
    <Route path="/onboarding/repartidores" element={vista(OnboardingRepartidorProtegido)} />
    {RutasEmpleados()}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
}

export default RutasAplicacion
