import { useLocation } from 'react-router-dom'
import { use_rastreo_mock } from '../../hooks/use_rastreo_mock'
import { MapaEntrega } from '../../components/mapa_entrega'
import { RepartidorEstadoEnvio } from './repartidor_estado_envio'

// esto sirve para que el repartidor vea la ubicacion de entrega en tiempo real
export function VistaMapaEntregaRepartidor() {
    const { state } = useLocation()
    const pedido = state?.pedido
    const { ubicacion, destino, estado_envio } = use_rastreo_mock(pedido?.id)

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-panel border border-borde p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-1">Mapa de entrega</h2>
                <p className="text-xs text-mutado">Pedido {pedido?.id?.slice(0, 8) || 'sin datos'}</p>
            </div>
            {pedido ? (
                <>
                    <MapaEntrega ubicacion={ubicacion} destino={destino} />
                    <RepartidorEstadoEnvio pedido={pedido} estado_envio={estado_envio} />
                </>
            ) : (
                <p className="text-xs text-mutado">Selecciona un pedido desde comenzar ruta</p>
            )}
        </div>
    )
}
