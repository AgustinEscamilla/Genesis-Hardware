import { NavLink } from 'react-router-dom'

const estiloBase = 'px-3 py-2 text-xs uppercase tracking-wide border'

// aqui maestro yo construyo la barra de secciones para el empleado
export function BarraNavegacionEmpleado() {
  const estilo = ({ isActive }) =>
    `${estiloBase} ${isActive ? 'bg-primario text-fondo border-primario' : 'bg-transparent text-texto border-borde hover:bg-panel'}`

  return (
    <nav className="bg-panel border border-borde p-3 flex flex-wrap gap-2">
      <NavLink to="." end className={estilo}>Dashboard</NavLink>
      <NavLink to="recepcion" className={estilo}>Recepcion</NavLink>
      <NavLink to="empaque" className={estilo}>Empaque</NavLink>
      <NavLink to="anden-salida" className={estilo}>Anden de salida</NavLink>
      <NavLink to="busqueda-pedidos" className={estilo}>Busqueda pedidos</NavLink>
      <NavLink to="inventario" className={estilo}>Inventario</NavLink>
      <NavLink to="gestion-pedidos" className={estilo}>Gestion pedidos</NavLink>
      <NavLink to="rechazos" className={estilo}>Rechazos</NavLink>
    </nav>
  )
}
