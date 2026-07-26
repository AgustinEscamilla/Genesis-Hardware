import { NavLink } from 'react-router-dom'

const estiloBase = 'whitespace-nowrap px-3 py-2 text-xs uppercase tracking-wide border transition-colors'

// aqui maestro yo construyo la barra de secciones para el empleado
export function BarraNavegacionEmpleado() {
  const estilo = ({ isActive }) =>
    `${estiloBase} ${isActive ? 'bg-primario text-fondo border-primario' : 'bg-transparent text-texto border-borde hover:bg-fondo'}`

  return (
    <nav className="flex gap-2 overflow-x-auto bg-panel py-1">
      <NavLink to="." end className={estilo}>Inicio</NavLink>
      <NavLink to="recepcion" className={estilo}>Recepcion</NavLink>
      <NavLink to="empaque" className={estilo}>Empaque</NavLink>
      <NavLink to="anden-salida" className={estilo}>Anden</NavLink>
      <NavLink to="busqueda-pedidos" className={estilo}>Pedidos</NavLink>
      <NavLink to="inventario" className={estilo}>Inventario</NavLink>
      <NavLink to="gestion-pedidos" className={estilo}>Gestion</NavLink>
      <NavLink to="rechazos" className={estilo}>Rechazos</NavLink>
    </nav>
  )
}
