import logo from '../assets/Gemini_Generated_Image_.png'
import { BotonSalida } from './boton_salida'

export function ContenedorPrincipal({ children }) {
  return (
    <div className="min-h-screen bg-fondo text-texto flex font-sans">
      <aside className="w-64 bg-panel border-r border-borde flex flex-col">
        <div className="p-6 border-b border-borde">
          <img src={logo} alt="Logo" className="w-32 h-auto mx-auto bg-[#0f0f0f] p-2 rounded-sm" />
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <button className="flex items-center w-full px-4 py-3 bg-secundario/10 text-secundario border-l-2 border-secundario font-medium text-left">
            Portal del Empleado
          </button>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-20 bg-fondo border-b border-borde flex items-center px-8">
          <input type="text" placeholder="Buscar sistemas..." className="w-96 bg-panel border border-borde text-texto px-4 py-2" />
          <div className="ml-auto">
            <BotonSalida />
          </div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}