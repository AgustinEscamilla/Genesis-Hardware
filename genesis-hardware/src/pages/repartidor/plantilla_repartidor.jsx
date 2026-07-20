import { Outlet } from 'react-router-dom'
import { useCerrarSesion } from '../../hooks/use_cerrar_sesion'
import { RepartidorBarraLateral } from './repartidor_barra_lateral'
import { RutaProtegida } from '../../components/ruta_protegida'

// aqui maestro yo preparo la plantilla general del modulo de repartidor
export function PlantillaRepartidor() {
  const { salir } = useCerrarSesion()

  return (
    <RutaProtegida>
      <div className="min-h-screen bg-fondo text-texto flex">
        <RepartidorBarraLateral />
        <div className="flex-1 flex flex-col">
          <div className="h-14 border-b border-borde bg-panel px-4 flex items-center justify-end">
            <button onClick={salir} className="border border-borde text-xs px-4 py-2 hover:bg-red-700 hover:border-red-700">Salir</button>
          </div>
          <div className="flex-1 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </RutaProtegida>
  )
}
