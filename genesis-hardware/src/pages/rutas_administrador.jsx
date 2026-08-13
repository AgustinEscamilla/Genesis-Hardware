import { Navigate, Route } from 'react-router-dom'
import { VistaDiferida } from '../components/estructura/vista_diferida'
import { cargar_vista } from '../services/servicio_vistas_diferidas'

const Plantilla = cargar_vista(() => import('./administrador/vista_principal'), 'VistaPrincipalAdministrador')
const Tablas = cargar_vista(() => import('./administrador/cuentas/vista_tablas_administrador'), 'VistaTablasAdministrador')
const CrearCuentas = cargar_vista(() => import('./administrador/cuentas/vista_crear_cuentas_administrador'), 'VistaCrearCuentasAdministrador')
const Catalogo = cargar_vista(() => import('./administrador/catalogo/vista_catalogo_administrador'), 'VistaCatalogoAdministrador')
const Mercancia = cargar_vista(() => import('./administrador/vista_mercancia_administrador'), 'VistaMercanciaAdministrador')
const Noticias = cargar_vista(() => import('./administrador/noticias/vista_noticias_administrador'), 'VistaNoticiasAdministrador')
const Dashboard = cargar_vista(() => import('./administrador/dashboard/vista_dashboard_administrador'), 'VistaDashboardAdministrador')
const ReportesCuentas = cargar_vista(() => import('./administrador/reportes/vista_reportes_administrador'), 'VistaReportesAdministrador')
const Abastecimiento = cargar_vista(() => import('./administrador/vista_abastecimiento_administrador'), 'VistaAbastecimientoAdministrador')
const vista = (componente) => <VistaDiferida componente={componente} />

export function RutasAdministrador() {
  return <>
    <Route path="/administrador" element={vista(Plantilla)}>
      <Route index element={<Navigate to="tablas" replace />} />
      <Route path="tablas" element={vista(Tablas)} />
      <Route path="crear-cuentas" element={vista(CrearCuentas)} />
      <Route path="catalogo" element={vista(Catalogo)} />
      <Route path="mercancia" element={vista(Mercancia)} />
      <Route path="noticias" element={vista(Noticias)} />
      <Route path="dashboard" element={vista(Dashboard)} />
      <Route path="reportes-cuentas" element={vista(ReportesCuentas)} />
      <Route path="abastecimiento" element={vista(Abastecimiento)} />
    </Route>
    <Route path="/admin" element={<Navigate to="/administrador" replace />} />
    <Route path="/administrador/lineas" element={<Navigate to="/administrador/noticias" replace />} />
  </>
}
