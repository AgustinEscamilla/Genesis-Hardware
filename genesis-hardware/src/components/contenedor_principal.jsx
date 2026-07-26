// aqui maestro yo documente este archivo para mantener trazabilidad
import logo from './logo_genesis.png'
import { BotonSalida } from './boton_salida'

export function ContenedorPrincipal({ children, navbar }) {
  return (
    <div className="min-h-screen bg-fondo text-texto flex flex-col font-sans">
      <aside className="w-full border-b border-borde bg-panel px-3 py-2 md:px-6">
        {navbar}
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="flex min-h-20 flex-wrap items-center gap-4 border-b border-borde bg-fondo px-4 py-4 md:px-8">
          <img src={logo} alt="Genesis Hardware" className="h-10 w-auto object-contain bg-panel p-1" />
          <div>
            <p className="text-xs font-black tracking-[0.25em] text-primario">GENESIS HARDWARE</p>
            <p className="text-[10px] uppercase tracking-widest text-mutado">Centro de operaciones</p>
          </div>
          <div className="ml-auto">
            <BotonSalida />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
