import { Route } from 'react-router-dom'
import { PlantillaRepartidor } from './repartidor/plantilla_repartidor'
import { VistaPrincipalRepartidor } from './repartidor/vista_principal_repartidor'
import { VistaPedidosAsignadosRepartidor } from './repartidor/vista_pedidos_asignados_repartidor'
import { VistaRutasRepartidor } from './repartidor/vista_rutas_repartidor'
import { VistaComenzarRutaRepartidor } from './repartidor/vista_comenzar_ruta_repartidor'
import { VistaReporteFallasRepartidor } from './repartidor/vista_reporte_fallas_repartidor'
import { VistaMapaEntregaRepartidor } from './repartidor/vista_mapa_entrega_repartidor'

// esto sirve para separar la navegacion del modulo repartidor en su propio archivo
export function RutasRepartidor() {
  return (
    <Route path="/repartidores" element={<PlantillaRepartidor />}>
      <Route index element={<VistaPrincipalRepartidor />} />
      <Route path="asignados" element={<VistaPedidosAsignadosRepartidor />} />
      <Route path="rutas" element={<VistaRutasRepartidor />} />
      <Route path="comenzar-ruta" element={<VistaComenzarRutaRepartidor />} />
      <Route path="mapa" element={<VistaMapaEntregaRepartidor />} />
      <Route path="reporte-fallas" element={<VistaReporteFallasRepartidor />} />
    </Route>
  )
}
