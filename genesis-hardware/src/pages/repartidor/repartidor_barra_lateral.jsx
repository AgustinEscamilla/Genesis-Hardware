import { NavLink } from 'react-router-dom'

// aqui maestro yo arme el estilo dinamico del link segun si esta activo o no
const estilo = ({ isActive }) =>
  `flex items-center gap-2 w-full text-left text-xs uppercase tracking-wide rounded-lg border-l-2 px-3 py-2 transition-all duration-200 ${isActive ? 'border-primario bg-primario/10 text-primario shadow-brillo-primario' : 'border-transparent text-mutado hover:border-borde hover:bg-fondo hover:text-texto'
  }`

const enlaces = [
  { destino: '.', fin: true, texto: 'Menú principal', icono: '◆' },
  { destino: 'asignados', texto: 'Pedidos asignados', icono: '◇' },
  { destino: 'rutas', texto: 'Rutas de entrega', icono: '⬢' },
  { destino: 'comenzar-ruta', texto: 'Comenzar ruta', icono: '▶' },
  { destino: 'reporte-fallas', texto: 'Reporte de fallas', icono: '▲' }
]

// aqui maestro yo arme la barra lateral del panel de reparto
export function RepartidorBarraLateral() {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-1 border-b border-borde bg-panel p-3 md:w-56 md:border-b-0 md:border-r md:p-4">
      <div className="mb-3 rounded-lg border border-borde bg-fondo p-3 md:mb-4">
        <p className="texto-degradado font-black tracking-widest">PANEL DE RUTA</p>
        <p className="flex items-center gap-1 text-[10px] text-mutado"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-terciario" />Operacion activa</p>
      </div>
      {enlaces.map((enlace) => (
        <NavLink key={enlace.destino} to={enlace.destino} end={enlace.fin} className={estilo}>
          <span className="text-terciario">{enlace.icono}</span>{enlace.texto}
        </NavLink>
      ))}
      <div className="mt-3 flex flex-wrap gap-3 border-t border-borde pt-3 text-[10px] text-mutado md:mt-auto md:flex-col">
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-secundario" />Estado de sistema</span>
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-secundario" />Historial</span>
      </div>
    </aside>
  )
}
