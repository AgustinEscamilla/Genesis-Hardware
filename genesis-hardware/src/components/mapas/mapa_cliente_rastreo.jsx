import { use_rastreo_mock } from '../../hooks/use_rastreo_mock'
import { MapaEntrega } from './mapa_entrega'

const etiquetas = { en_transito: 'En transito hacia tu domicilio', entregado: 'Entregado' }

// esto sirve para que el cliente vea el avance de su pedido en camino
export function MapaClienteRastreo({ pedido_id }) {
    const { ubicacion, origen_inicial, destino, estado_envio } = use_rastreo_mock(pedido_id)

    return (
        <div className="flex flex-col gap-2">
            <MapaEntrega ubicacion={ubicacion} origen={origen_inicial} destino={destino} />
            <p className="text-[10px] text-mutado">{etiquetas[estado_envio] || estado_envio}</p>
        </div>
    )
}
