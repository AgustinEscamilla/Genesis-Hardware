// aqui maestro yo documente este archivo para mantener trazabilidad
import logo from '../recursos/logo_genesis.png'
import { Link } from 'react-router-dom'
import { BotonSalida } from '../formularios/boton_salida'

export function ContenedorPrincipal({ children, navbar }) {
  return (
    <div className="min-h-screen bg-fondo text-texto flex flex-col font-sans">
      <header className="sticky top-0 z-40 flex flex-wrap items-center gap-4 border-b border-borde bg-panel px-4 py-3 backdrop-blur-xl md:px-6">
        <img src={logo} alt="Genesis Hardware" className="h-10 w-auto object-contain rounded-md bg-fondo p-1" />
        <div className="shrink-0">
          <p className="text-xs font-black tracking-[0.25em] texto-degradado">GENESIS HARDWARE</p>
          <p className="text-[10px] uppercase tracking-widest text-mutado">Centro de operaciones</p>
        </div>
        <div className="flex min-w-0 flex-1 justify-center">{navbar}</div>
        <div className="shrink-0 flex items-center gap-2">
          <Link to="/onboarding/empleados" className="rounded-lg border border-borde bg-panel px-3 py-1.5 text-sm font-medium text-texto transition-all duration-200 hover:-translate-y-0.5 hover:border-primario/70 hover:text-primario focus:outline-none focus:ring-2 focus:ring-primario">
            Editar perfil
          </Link>
          <BotonSalida />
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-[1600px] flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </main>
    </div>
  )
}
