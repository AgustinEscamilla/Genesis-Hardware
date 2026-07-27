import { Outlet } from 'react-router-dom'
import { useCerrarSesion } from '../../hooks/use_cerrar_sesion'
import { RepartidorBarraLateral } from './repartidor_barra_lateral'
import { RutaProtegida } from '../../components/ruta_protegida'

// aqui maestro yo preparo la plantilla general del modulo de repartidor
export function PlantillaRepartidor() {
  const { salir } = useCerrarSesion()

  return (
    <RutaProtegida rolPermitido="repartidor">
      <div className="flex min-h-screen flex-col bg-fondo text-texto md:flex-row">
        <RepartidorBarraLateral />
        <div className="flex-1 flex flex-col">
          <div className="flex min-h-14 items-center justify-between gap-4 border-b border-borde bg-panel px-4 py-3 md:px-6">
            <p className="text-xs uppercase tracking-widest text-mutado">Panel de reparto <span className="text-primario">Genesis</span></p>
            <button onClick={salir} className="border border-borde text-xs px-4 py-2 rounded hover:bg-primario hover:border-primario hover:text-fondo transition-colors">Salir</button>
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
