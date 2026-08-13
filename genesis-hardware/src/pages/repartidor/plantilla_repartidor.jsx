import { Link, Outlet } from 'react-router-dom'
import { useCerrarSesion } from '../../hooks/use_cerrar_sesion'
import { RepartidorBarraLateral } from './repartidor_barra_lateral'
import { RutaProtegida } from '../../components/estructura/ruta_protegida'

// aqui maestro yo preparo la plantilla general del modulo de repartidor
export function PlantillaRepartidor() {
  const { salir } = useCerrarSesion()

  return (
    <RutaProtegida rolPermitido="repartidor">
      <div className="flex min-h-screen flex-col bg-fondo text-texto md:flex-row">
        <RepartidorBarraLateral />
        <div className="flex-1 flex flex-col">
          <div className="sticky top-0 z-40 flex min-h-14 items-center justify-between gap-4 border-b border-borde bg-panel px-4 py-3 backdrop-blur-xl md:px-6">
            <p className="text-xs uppercase tracking-widest text-mutado">Panel de reparto <span className="texto-degradado font-bold">Genesis</span></p>
            <div className="flex items-center gap-2">
              <Link to="/onboarding/repartidores" className="rounded-lg border border-borde px-4 py-2 text-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primario hover:text-primario">
                Editar perfil
              </Link>
              <button onClick={salir} className="rounded-lg border border-borde px-4 py-2 text-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primario hover:bg-degradado-primario hover:text-fondo">Salir</button>
            </div>
          </div>
          <div className="flex-1 p-4 md:p-6">
            <div className="mx-auto w-full max-w-6xl">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </RutaProtegida>
  )
}
