import { NavLink } from 'react-router-dom'

const estilosBase = 'px-4 py-2 text-xs uppercase tracking-wide border'

// aqui maestro yo arme esta barra para navegar entre las vistas de administracion
export function BarraNavegacionAdministrador() {

  // esto sirve para cambiar de rutas y marcar visualmente la opcion activa
  const estilo = ({ isActive }) =>
    `${estilosBase} ${isActive ? 'bg-primario text-fondo border-primario' : 'bg-transparent text-texto border-borde hover:bg-panel'}`

  return (
    <div className="bg-panel border border-borde p-3 flex flex-wrap gap-3 items-center">
      <NavLink to="tablas" className={estilo}>Tablas</NavLink>
      <NavLink to="crear-cuentas" className={estilo}>Crear cuentas</NavLink>
      <NavLink to="catalogo" className={estilo}>Catalogo</NavLink>
      <NavLink to="mercancia" className={estilo}>Mercancia</NavLink>
      <NavLink to="lineas" className={estilo}>Lineas</NavLink>
    </div>
  )
}