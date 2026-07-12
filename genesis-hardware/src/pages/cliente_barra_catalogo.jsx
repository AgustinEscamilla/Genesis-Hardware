import { BotonSalida } from '../components/boton_salida'

// aqui maestro yo arme la barra superior del catalogo de cliente
export function ClienteBarraCatalogo({ alConfirmar, total }) {
  return (
    <header className="h-16 border-b border-borde bg-panel px-4 flex items-center gap-4">
      <p className="text-primario font-black tracking-wide">CORE SYNC INDUSTRIAL</p>
      <input className="ml-2 w-80 bg-fondo border border-borde text-texto px-3 py-2 text-xs" placeholder="Search catalog..." />
      <nav className="ml-auto flex items-center gap-4 text-xs text-mutado">
        <span>Dashboard</span>
        <span className="text-texto border-b border-primario pb-1">Catalogo</span>
        <button onClick={alConfirmar} className="border border-primario text-primario px-3 py-2 hover:bg-primario hover:text-fondo transition-colors">
          Confirmar {total}
        </button>
        <BotonSalida />
      </nav>
    </header>
  )
}
