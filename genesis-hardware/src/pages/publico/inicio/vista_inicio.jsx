import logo from '../../../assets/Gemini_Generated_Image_.png'
import { SeccionHero } from './seccion_hero'
import { SeccionModulos } from './seccion_modulos'

// aqui maestro exporte la vista de inicio completa
export function VistaInicio() {
  return (
    <div className="min-h-screen bg-fondo flex flex-col font-sans">
      // esto sirve para poner el logo y la navegacion superior
      <header className="h-20 border-b border-borde flex items-center justify-between px-8 bg-panel">
        <img 
          src={logo} 
          alt="Genesis Hardware" 
          className="h-12 w-auto object-contain bg-[#0f0f0f] p-2 rounded-sm" 
        />
        <nav className="flex gap-6 text-sm text-mutado font-medium">
          <button className="hover:text-texto transition-colors">Catálogo</button>
          <button className="hover:text-texto transition-colors text-primario">Portal Empleados</button>
        </nav>
      </header>
      // aqui puse profe las secciones principales de la pagina
      <main className="flex-1">
        <SeccionHero />
        <SeccionModulos />
      </main>
      // esto sirve para cerrar con la informacion legal y de certificacion
      <footer className="border-t border-borde p-8 flex justify-between items-center text-xs text-mutado bg-fondo">
        <span className="font-bold tracking-wider">CORE-SYNC INDUSTRIAL</span>
        <div className="flex gap-6"><span>ISO-9001 Certificado</span><span>Especificaciones</span><span>Privacidad</span></div>
      </footer>
    </div>
  )
}