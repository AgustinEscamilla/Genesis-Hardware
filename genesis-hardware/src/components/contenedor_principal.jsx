// aqui maestro yo documente este archivo para mantener trazabilidad
import { BotonSalida } from './boton_salida'

export function ContenedorPrincipal({ children, navbar }) {
  return (
    <div className="min-h-screen bg-fondo text-texto flex flex-col font-sans">
      <aside className="w-full bg-panel border-b border-borde p-2">
        {navbar}
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
