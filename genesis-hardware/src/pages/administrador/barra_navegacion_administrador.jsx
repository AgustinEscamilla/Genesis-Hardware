import { NavLink } from 'react-router-dom'

const estilosBase = 'whitespace-nowrap px-3 py-2 text-xs uppercase tracking-wide border transition-colors'

// aqui maestro yo arme esta barra para navegar entre las vistas de administracion
export function BarraNavegacionAdministrador() {
  // esto sirve para cambiar de rutas y marcar visualmente la opcion activa
  const estilo = ({ isActive }) =>
    `${estilosBase} rounded-lg ${isActive ? 'bg-degradado-primario text-fondo border-transparent shadow-brillo-primario' : 'bg-transparent text-texto border-borde hover:-translate-y-0.5 hover:border-primario/60'}`

  return (
    <nav className="flex flex-wrap items-center rounded-xl border border-borde bg-panel p-3 shadow-vidrio">
      <div className="flex min-w-0 w-full flex-wrap justify-center gap-2 lg:justify-start">
        <NavLink to="tablas" className={estilo}>Operacion</NavLink>
        <NavLink to="crear-cuentas" className={estilo}>Cuentas</NavLink>
        <NavLink to="catalogo" className={estilo}>Catalogo</NavLink>
        <NavLink to="mercancia" className={estilo}>Inventario</NavLink>
        <NavLink to="noticias" className={estilo}>Noticias</NavLink>
        <NavLink to="dashboard" className={estilo}>Reportes</NavLink>
        <NavLink to="reportes-cuentas" className={estilo}>Incidencias</NavLink>
        <NavLink to="abastecimiento" className={estilo}>Abastecimiento</NavLink>
      </div>
    </nav>
  )
}
