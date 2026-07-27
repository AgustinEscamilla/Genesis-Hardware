import { usePedidosEstado } from './use_pedidos_estado'
import { actualizarEstadoPedido, ESTADOS_PEDIDO } from '../services/servicio_flujo_pedidos'

// esto sirve para que el empleado vea los pedidos rechazados y decida reprocesarlos
export function usePedidosRechazados() {
    const { pedidos, cargando, error } = usePedidosEstado(ESTADOS_PEDIDO.RECHAZADO)

    const reprocesar = (pedido) => actualizarEstadoPedido(pedido, ESTADOS_PEDIDO.PENDIENTE_RECOLECCION)

    return { pedidos, cargando, error, reprocesar }
}
