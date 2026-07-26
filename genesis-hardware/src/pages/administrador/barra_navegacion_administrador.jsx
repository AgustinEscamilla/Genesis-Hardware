import { NavLink } from 'react-router-dom'
import { CampanaNotificaciones } from '../../components/campana_notificaciones'
import { useNotificacionesAdmin } from '../../hooks/use_notificaciones_admin'

const estilosBase = 'whitespace-nowrap px-3 py-2 text-xs uppercase tracking-wide border transition-colors'

// aqui maestro yo arme esta barra para navegar entre las vistas de administracion
export function BarraNavegacionAdministrador() {
  const { notificaciones, marcarLeida } = useNotificacionesAdmin()

  // esto sirve para cambiar de rutas y marcar visualmente la opcion activa
  const estilo = ({ isActive }) =>
    `${estilosBase} ${isActive ? 'bg-primario text-fondo border-primario' : 'bg-transparent text-texto border-borde hover:bg-fondo'}`

  return (
    <nav className="flex items-center gap-2 overflow-x-auto bg-panel py-1">
      <NavLink to="tablas" className={estilo}>Tablas</NavLink>
      <NavLink to="crear-cuentas" className={estilo}>Crear cuentas</NavLink>
      <NavLink to="catalogo" className={estilo}>Catalogo</NavLink>
      <NavLink to="mercancia" className={estilo}>Mercancia</NavLink>
      <NavLink to="lineas" className={estilo}>Lineas</NavLink>
      <NavLink to="dashboard" className={estilo}>Dashboard</NavLink>
      <div className="ml-auto shrink-0">
        <CampanaNotificaciones notificaciones={notificaciones} alMarcarLeida={marcarLeida} />
      </div>
    </nav>
  )
}
