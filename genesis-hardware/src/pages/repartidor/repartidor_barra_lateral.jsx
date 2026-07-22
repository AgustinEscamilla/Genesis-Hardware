import { NavLink } from 'react-router-dom'

// aqui maestro yo arme el estilo dinamico del link segun si esta activo o no
const estilo = ({ isActive }) =>
  `flex items-center gap-2 w-full text-left text-xs uppercase tracking-wide border-l-2 px-3 py-2 transition-colors ${isActive ? 'border-primario bg-fondo text-primario' : 'border-transparent text-mutado hover:border-borde hover:bg-fondo hover:text-texto'
  }`

const enlaces = [
  { destino: '.', fin: true, texto: 'Dashboard', icono: '◆' },
  { destino: 'asignados', texto: 'Pedidos asignados', icono: '◇' },
  { destino: 'rutas', texto: 'Rutas de entrega', icono: '⬢' },
  { destino: 'comenzar-ruta', texto: 'Comenzar ruta', icono: '▶' },
  { destino: 'reporte-fallas', texto: 'Reporte de fallas', icono: '▲' }
]

// aqui maestro yo arme la barra lateral del panel de reparto
export function RepartidorBarraLateral() {
  return (
    <aside className="w-56 border-r border-borde bg-panel p-4 flex flex-col gap-1">
      <div className="border border-borde bg-fondo p-3 mb-4 rounded-lg">
        <p className="text-primario font-black tracking-widest">NODO 01</p>
        <p className="text-[10px] text-mutado flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-terciario animate-pulse" />Terminal activa</p>
      </div>
      {enlaces.map((enlace) => (
        <NavLink key={enlace.destino} to={enlace.destino} end={enlace.fin} className={estilo}>
          <span className="text-terciario">{enlace.icono}</span>{enlace.texto}
        </NavLink>
      ))}
      <div className="mt-auto border-t border-borde pt-3 text-[10px] text-mutado flex flex-col gap-2">
        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secundario" />Diagnostico</span>
        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secundario" />Registros</span>
      </div>
    </aside>
  )
}
