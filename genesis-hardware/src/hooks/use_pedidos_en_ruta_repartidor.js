import { usePedidosEstado } from './use_pedidos_estado'
import { useAutenticacion } from './use_autenticacion'
import { ESTADOS_PEDIDO, actualizarEstadoPedido } from '../services/servicio_flujo_pedidos'

// esto sirve para exponer al repartidor solo los pedidos que ya estan en ruta
export function usePedidosEnRutaRepartidor() {
  const { usuarioActual } = useAutenticacion()
  const { pedidos, cargando, error } = usePedidosEstado(ESTADOS_PEDIDO.EN_REPARTO)
  const pedidos_propios = pedidos.filter((pedido) => pedido.repartidorId === usuarioActual?.uid)

  const marcarEntregado = (pedido) => actualizarEstadoPedido(pedido, ESTADOS_PEDIDO.ENTREGADO)

  return { pedidos: pedidos_propios, cargando, error, marcarEntregado }
}
