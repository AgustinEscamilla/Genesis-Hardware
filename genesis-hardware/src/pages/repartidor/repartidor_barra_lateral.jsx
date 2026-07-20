import { NavLink } from 'react-router-dom'

const estilo = 'block w-full text-left text-xs uppercase tracking-wide border border-borde px-3 py-2 hover:bg-panel'

// aqui maestro yo arme la barra lateral del panel de reparto
export function RepartidorBarraLateral() {
  return (
    <aside className="w-56 border-r border-borde bg-panel p-4 flex flex-col">
      <div className="border border-borde p-3 mb-4">
        <p className="text-primario font-black">NODO 01</p>
        <p className="text-xs text-mutado">Terminal activa</p>
      </div>
      <NavLink to="." end className={estilo}>Dashboard</NavLink>
      <NavLink to="asignados" className={estilo}>Pedidos asignados</NavLink>
      <NavLink to="comenzar-ruta" className={estilo}>Comenzar ruta</NavLink>
      <NavLink to="reporte-fallas" className={estilo}>Reporte de fallas</NavLink>
      <div className="mt-auto text-xs text-mutado flex flex-col gap-2"><span>Diagnostico</span><span>Registros</span></div>
    </aside>
  )
}
