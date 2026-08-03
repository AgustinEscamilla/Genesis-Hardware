import { usePedidosEstado } from './use_pedidos_estado'
import { ESTADOS_PEDIDO, actualizarEstadoPedido } from '../services/servicio_flujo_pedidos'

// esto sirve para exponer al repartidor solo los pedidos que ya estan en ruta
export function usePedidosEnRutaRepartidor() {
  const { pedidos, cargando, error } = usePedidosEstado(ESTADOS_PEDIDO.EN_REPARTO)

  const marcarEntregado = (pedido) => actualizarEstadoPedido(pedido, ESTADOS_PEDIDO.ENTREGADO)

  return { pedidos, cargando, error, marcarEntregado }
}
