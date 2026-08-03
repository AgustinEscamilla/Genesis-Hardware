import { NavLink } from 'react-router-dom'

// aqui maestro yo arme el estilo dinamico del link segun si esta activo o no
const estilo = ({ isActive }) =>
  `flex items-center gap-2 w-full text-left text-xs uppercase tracking-wide rounded-lg border-l-2 px-3 py-2 transition-all duration-200 ${isActive ? 'border-primario bg-primario/10 text-primario shadow-brillo-primario' : 'border-transparent text-mutado hover:border-borde hover:bg-fondo hover:text-texto'
  }`

const enlaces = [
  { destino: '.', fin: true, texto: 'Menú principal', icono: '◆' },
  { destino: 'asignados', texto: 'Pedidos asignados', icono: '◇' },
  { destino: 'rutas', texto: 'Planificar ruta', icono: '⬢' },
  { destino: 'comenzar-ruta', texto: 'Manifiestos activos', icono: '▶' },
  { destino: 'en-ruta', texto: 'Pedidos en ruta', icono: '➤' },
  { destino: 'reporte-fallas', texto: 'Reporte de fallas', icono: '▲' }
]

export function RepartidorBarraLateral() {
  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-borde bg-panel p-3 md:w-64 md:border-b-0 md:border-r md:p-4">
      <div className="rounded-xl border border-primario/30 bg-gradient-to-br from-fondo to-panel p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-mutado">Genesis logística</p>
        <p className="mt-2 text-lg font-black texto-degradado">Panel de reparto</p>
        <p className="mt-2 flex items-center gap-2 text-[10px] text-mutado"><span className="h-2 w-2 animate-pulse rounded-full bg-terciario" />Operación activa en Campeche</p>
      </div>
      <p className="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-mutado">Operación diaria</p>
      <nav className="flex flex-1 flex-wrap gap-1 md:flex-col" aria-label="Navegación del repartidor">
        {enlaces.map((enlace) => <NavLink key={enlace.destino} to={enlace.destino} end={enlace.fin} className={estilo}><span className="flex h-6 w-6 items-center justify-center rounded-md bg-fondo text-[11px] text-terciario">{enlace.icono}</span><span>{enlace.texto}</span></NavLink>)}
      </nav>
      <div className="mt-6 border-t border-borde pt-4 text-[10px] text-mutado">
        <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-terciario" />GPS listo para iniciar ruta</p>
        <p className="mt-2 pl-4">Solo entregas dentro de Campeche</p>
      </div>
    </aside>
  )
}
