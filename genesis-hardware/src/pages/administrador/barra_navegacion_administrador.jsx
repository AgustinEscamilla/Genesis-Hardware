import { NavLink } from 'react-router-dom'
import { CampanaNotificaciones } from '../../components/campana_notificaciones'
import { useNotificacionesAdmin } from '../../hooks/use_notificaciones_admin'

const estilosBase = 'whitespace-nowrap px-3 py-2 text-xs uppercase tracking-wide border transition-colors'

// aqui maestro yo arme esta barra para navegar entre las vistas de administracion
export function BarraNavegacionAdministrador() {
  const { notificaciones, marcarLeida } = useNotificacionesAdmin()

  // esto sirve para cambiar de rutas y marcar visualmente la opcion activa
  const estilo = ({ isActive }) =>
    `${estilosBase} rounded-lg ${isActive ? 'bg-degradado-primario text-fondo border-transparent shadow-brillo-primario' : 'bg-transparent text-texto border-borde hover:-translate-y-0.5 hover:border-primario/60'}`

  return (
    <nav className="flex items-center justify-center gap-2 overflow-x-auto bg-panel py-1">
      <div className="flex min-w-max flex-wrap justify-center gap-2">
        <NavLink to="tablas" className={estilo}>Operacion</NavLink>
        <NavLink to="crear-cuentas" className={estilo}>Cuentas</NavLink>
        <NavLink to="catalogo" className={estilo}>Catalogo</NavLink>
        <NavLink to="mercancia" className={estilo}>Inventario</NavLink>
        <NavLink to="noticias" className={estilo}>Noticias</NavLink>
        <NavLink to="dashboard" className={estilo}>Reportes</NavLink>
        <NavLink to="abastecimiento" className={estilo}>Abastecimiento</NavLink>
      </div>
      <div className="shrink-0">
        <CampanaNotificaciones notificaciones={notificaciones} alMarcarLeida={marcarLeida} />
      </div>
    </nav>
  )
}
