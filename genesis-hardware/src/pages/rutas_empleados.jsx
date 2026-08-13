import { Route } from 'react-router-dom'
import { VistaDiferida } from '../components/estructura/vista_diferida'
import { cargar_vista } from '../services/servicio_vistas_diferidas'

const Plantilla = cargar_vista(() => import('./plantilla_empleados'), 'PlantillaEmpleados')
const Dashboard = cargar_vista(() => import('./empleados/vista_principal_empleado'), 'VistaPrincipalEmpleado')
const Recepcion = cargar_vista(() => import('./empleados/vista_recepcion_empleado'), 'VistaRecepcionEmpleado')
const Inventario = cargar_vista(() => import('./empleados/vista_inventario_empleado'), 'VistaInventarioEmpleado')
const Gestion = cargar_vista(() => import('./empleados/vista_gestion_pedidos_empleado'), 'VistaGestionPedidosEmpleado')
const Empaque = cargar_vista(() => import('./empleados/vista_empaque_empleado'), 'VistaEmpaqueEmpleado')
const Anden = cargar_vista(() => import('./empleados/vista_liberacion_empleado'), 'VistaLiberacionEmpleado')
const Reportes = cargar_vista(() => import('./empleados/vista_pedidos_rechazados_empleado'), 'VistaReportesEmpleado')
const RecepcionDistribuidor = cargar_vista(() => import('./empleados/vista_recepcion_distribuidor_empleado'), 'VistaRecepcionDistribuidorEmpleado')
const vista = (componente) => <VistaDiferida componente={componente} />

export function RutasEmpleados() {
  return <Route path="/empleados" element={vista(Plantilla)}>
    <Route index element={vista(Dashboard)} />
    <Route path="recepcion" element={vista(Recepcion)} />
    <Route path="inventario" element={vista(Inventario)} />
    <Route path="gestion-pedidos" element={vista(Gestion)} />
    <Route path="empaque" element={vista(Empaque)} />
    <Route path="anden-salida" element={vista(Anden)} />
    <Route path="reporte" element={vista(Reportes)} />
    <Route path="recepcion-distribuidor" element={vista(RecepcionDistribuidor)} />
  </Route>
}
