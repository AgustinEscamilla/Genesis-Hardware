import { useEffect, useMemo, useState } from 'react'
import { usePedidosEstado } from './use_pedidos_estado'
import { ESTADOS_PEDIDO } from '../services/servicio_flujo_pedidos'
import { agruparPedidosPorZona, escucharManifiestos, generarManifiesto, marcarManifiestoEntregado } from '../services/servicio_manifiestos'

// esto sirve para exponer zonas pendientes y manifiestos activos al repartidor
export function useManifiestos() {
  const { pedidos: listosDespacho } = usePedidosEstado(ESTADOS_PEDIDO.LISTO_DESPACHO)
  const { pedidos: pedidosEnReparto } = usePedidosEstado(ESTADOS_PEDIDO.EN_REPARTO)
  const [manifiestos, setManifiestos] = useState([])

  useEffect(() => escucharManifiestos(setManifiestos), [])

  const zonasPendientes = useMemo(() => agruparPedidosPorZona(listosDespacho), [listosDespacho])

  const pedidosDelManifiesto = (manifiesto) => pedidosEnReparto.filter((p) => p.manifiestoId === manifiesto.id)

  return {
    zonasPendientes,
    manifiestos,
    pedidosEnReparto,
    generar: (zona, pedidos) => generarManifiesto(zona, pedidos),
    entregar: (manifiesto) => marcarManifiestoEntregado(manifiesto, pedidosDelManifiesto(manifiesto))
  }
}
