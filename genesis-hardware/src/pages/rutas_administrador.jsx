import { Navigate, Route } from 'react-router-dom'
import { VistaPrincipalAdministrador } from './administrador/vista_principal'
import { VistaCrearCuentasAdministrador } from './administrador/cuentas/vista_crear_cuentas_administrador'
import { VistaTablasAdministrador } from './administrador/cuentas/vista_tablas_administrador'
import { VistaCatalogoAdministrador } from './administrador/catalogo/vista_catalogo_administrador'
import { VistaMercanciaAdministrador } from './administrador/vista_mercancia_administrador'
import { VistaLineasAdministrador } from './administrador/lineas/vista_lineas_administrador'

// aqui maestro yo agrupo las rutas de administrador en un fragmento reutilizable
export function RutasAdministrador() {
  return (
    <>
      <Route path="/administrador" element={<VistaPrincipalAdministrador />}>
        <Route index element={<Navigate to="tablas" replace />} />
        <Route path="tablas" element={<VistaTablasAdministrador />} />
        <Route path="crear-cuentas" element={<VistaCrearCuentasAdministrador />} />
        <Route path="catalogo" element={<VistaCatalogoAdministrador />} />
        <Route path="mercancia" element={<VistaMercanciaAdministrador />} />
        <Route path="lineas" element={<VistaLineasAdministrador />} />
      </Route>
      <Route path="/admin" element={<Navigate to="/administrador" replace />} />
    </>
  )
}
