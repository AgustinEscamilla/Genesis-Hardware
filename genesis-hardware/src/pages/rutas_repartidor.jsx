import { Route } from 'react-router-dom'
import { VistaDiferida } from '../components/vista_diferida'
import { cargar_vista } from '../services/servicio_vistas_diferidas'

const Plantilla = cargar_vista(() => import('./repartidor/plantilla_repartidor'), 'PlantillaRepartidor')
const Dashboard = cargar_vista(() => import('./repartidor/vista_principal_repartidor'), 'VistaPrincipalRepartidor')
const Asignados = cargar_vista(() => import('./repartidor/vista_pedidos_asignados_repartidor'), 'VistaPedidosAsignadosRepartidor')
const Rutas = cargar_vista(() => import('./repartidor/vista_rutas_repartidor'), 'VistaRutasRepartidor')
const Comenzar = cargar_vista(() => import('./repartidor/vista_comenzar_ruta_repartidor'), 'VistaComenzarRutaRepartidor')
const Mapa = cargar_vista(() => import('./repartidor/vista_mapa_entrega_repartidor'), 'VistaMapaEntregaRepartidor')
const Fallas = cargar_vista(() => import('./repartidor/vista_reporte_fallas_repartidor'), 'VistaReporteFallasRepartidor')
const vista = (componente) => <VistaDiferida componente={componente} />

export function RutasRepartidor() {
  return <Route path="/repartidores" element={vista(Plantilla)}>
    <Route index element={vista(Dashboard)} />
    <Route path="asignados" element={vista(Asignados)} />
    <Route path="rutas" element={vista(Rutas)} />
    <Route path="comenzar-ruta" element={vista(Comenzar)} />
    <Route path="mapa" element={vista(Mapa)} />
    <Route path="reporte-fallas" element={vista(Fallas)} />
  </Route>
}
