import { NavLink } from 'react-router-dom'

const estiloBase = 'whitespace-nowrap px-3 py-2 text-xs uppercase tracking-wide border transition-colors'

// aqui maestro yo construyo la barra de secciones para el empleado
export function BarraNavegacionEmpleado() {
  const estilo = ({ isActive }) =>
    `${estiloBase} rounded-lg ${isActive ? 'bg-degradado-primario text-fondo border-transparent shadow-brillo-primario' : 'bg-transparent text-texto border-borde hover:-translate-y-0.5 hover:border-primario/60'}`

  return (
    <nav className="flex justify-center gap-2 overflow-x-auto bg-panel py-1">
      <NavLink to="." end className={estilo}>Menu principal</NavLink>
      <NavLink to="recepcion" className={estilo}>Recepcion</NavLink>
      <NavLink to="empaque" className={estilo}>Empaque</NavLink>
      <NavLink to="anden-salida" className={estilo}>Anden</NavLink>
      <NavLink to="inventario" className={estilo}>Inventario</NavLink>
      <NavLink to="recepcion-distribuidor" className={estilo}>Proveedor</NavLink>
      <NavLink to="gestion-pedidos" className={estilo}>Gestion</NavLink>
      <NavLink to="reporte" className={estilo}>Reporte</NavLink>
    </nav>
  )
}
