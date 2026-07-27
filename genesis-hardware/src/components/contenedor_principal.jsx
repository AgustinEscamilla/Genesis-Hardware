// aqui maestro yo documente este archivo para mantener trazabilidad
import logo from './logo_genesis.png'
import { BotonSalida } from './boton_salida'

export function ContenedorPrincipal({ children, navbar }) {
  return (
    <div className="min-h-screen bg-fondo text-texto flex flex-col font-sans">
      <header className="flex flex-wrap items-center gap-4 border-b border-borde bg-panel px-4 py-3 md:px-6">
        <img src={logo} alt="Genesis Hardware" className="h-10 w-auto object-contain bg-fondo p-1" />
        <div className="shrink-0">
          <p className="text-xs font-black tracking-[0.25em] text-primario">GENESIS HARDWARE</p>
          <p className="text-[10px] uppercase tracking-widest text-mutado">Centro de operaciones</p>
        </div>
        <div className="min-w-0 flex-1">{navbar}</div>
        <div className="shrink-0"><BotonSalida /></div>
      </header>
      <main className="mx-auto flex w-full max-w-[1600px] flex-1 overflow-y-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  )
}
