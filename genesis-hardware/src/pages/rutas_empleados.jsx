import { Route } from 'react-router-dom'
import { PlantillaEmpleados } from './plantilla_empleados'
import { VistaPrincipalEmpleado } from './empleados/vista_principal_empleado'
import { VistaRecepcionEmpleado } from './empleados/vista_recepcion_empleado'
import { VistaBusquedaPedidosEmpleado } from './empleados/vista_busqueda_pedidos_empleado'
import { VistaInventarioEmpleado } from './empleados/vista_inventario_empleado'
import { VistaGestionPedidosEmpleado } from './empleados/vista_gestion_pedidos_empleado'
import { VistaEmpaqueEmpleado } from './empleados/vista_empaque_empleado'
import { VistaLiberacionEmpleado } from './empleados/vista_liberacion_empleado'

// aqui maestro yo defino las rutas internas del modulo de empleados
export function RutasEmpleados() {
  return (
    <Route path="/empleados" element={<PlantillaEmpleados />}>
      <Route index element={<VistaPrincipalEmpleado />} />
      <Route path="recepcion" element={<VistaRecepcionEmpleado />} />
      <Route path="busqueda-pedidos" element={<VistaBusquedaPedidosEmpleado />} />
      <Route path="inventario" element={<VistaInventarioEmpleado />} />
      <Route path="gestion-pedidos" element={<VistaGestionPedidosEmpleado />} />
      <Route path="empaque" element={<VistaEmpaqueEmpleado />} />
      <Route path="anden-salida" element={<VistaLiberacionEmpleado />} />
    </Route>
  )
}
