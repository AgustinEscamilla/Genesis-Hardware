import { useCerrarSesion } from '../../hooks/use_cerrar_sesion'
import { useManifiestos } from '../../hooks/use_manifiestos'
import { RepartidorBarraLateral } from './repartidor_barra_lateral'
import { RepartidorZonasPendientes } from './repartidor_zonas_pendientes'
import { RepartidorListaManifiestos } from './repartidor_lista_manifiestos'

// aqui maestro yo muestro el panel del repartidor con manifiestos por zona
export function VistaPrincipalRepartidor() {
  const { salir } = useCerrarSesion()
  const { zonasPendientes, manifiestos, pedidosEnReparto, generar, entregar } = useManifiestos()

  return (
    <div className="min-h-screen bg-fondo text-texto flex">
      <RepartidorBarraLateral />
      <div className="flex-1 flex flex-col">
        <div className="h-14 border-b border-borde bg-panel px-4 flex items-center justify-end">
          <button onClick={salir} className="border border-borde text-xs px-4 py-2 hover:bg-red-700 hover:border-red-700">Cerrar sesion</button>
        </div>
        <div className="flex-1 p-4 flex flex-col gap-4">
          <RepartidorZonasPendientes zonasPendientes={zonasPendientes} alGenerar={generar} />
          <RepartidorListaManifiestos manifiestos={manifiestos} pedidosEnReparto={pedidosEnReparto} alEntregar={entregar} />
        </div>
      </div>
    </div>
  )
}
