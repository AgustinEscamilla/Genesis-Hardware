// aqui maestro yo documente este archivo para mantener trazabilidad
import { Link } from 'react-router-dom'
import logo from '../../../components/logo_genesis.png'
import { SeccionHero } from './seccion_hero'
import { SeccionModulos } from './seccion_modulos'
import { SeccionCatalogo } from './seccion_catalogo'

export function VistaInicio() {
  return (
    <div className="min-h-screen bg-fondo font-sans text-texto">
      <header className="sticky top-0 z-50 border-b border-borde/80 bg-fondo/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="Ir al inicio">
            <img src={logo} alt="Genesis Hardware" className="h-10 w-auto object-contain" />
            <div className="hidden sm:block">
              <p className="text-xs font-black tracking-[0.25em] text-primario">GENESIS HARDWARE</p>
              <p className="text-[10px] uppercase tracking-widest text-mutado">Componentes de alto rendimiento</p>
            </div>
          </Link>
          <nav className="flex items-center gap-2 text-xs font-semibold sm:gap-5" aria-label="Navegacion principal">
            <a href="#noticias" className="px-2 py-2 text-mutado transition-colors hover:text-texto">Noticias</a>
            <a href="#catalogo" className="px-2 py-2 text-mutado transition-colors hover:text-texto">Catalogo</a>
            <Link to="/autenticacion" className="border border-primario px-3 py-2 text-primario transition-colors hover:bg-primario hover:text-fondo">Iniciar sesion</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <SeccionHero />
        <SeccionModulos />
        <SeccionCatalogo />
      </main>

      <footer className="border-t border-borde bg-panel px-4 py-8 text-xs text-mutado md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-bold tracking-wider text-texto">GENESIS HARDWARE</span>
          <div className="flex flex-wrap gap-4"><span>Distribucion nacional</span><span>Atencion comercial</span><span>Privacidad</span></div>
        </div>
      </footer>
    </div>
  )
}
