import { usePedidosEstado } from './use_pedidos_estado'
import { ESTADOS_PEDIDO } from '../services/servicio_flujo_pedidos'

// esto sirve para que el repartidor solo vea lo que el empleado libero en el anden
export function usePaquetesAnden() {
    const { pedidos } = usePedidosEstado(ESTADOS_PEDIDO.LISTO_DESPACHO)
    const pedidosLiberados = pedidos.filter((p) => p.liberadoParaRepartidor === true)

    return { pedidosLiberados }
}
