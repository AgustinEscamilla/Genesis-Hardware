import { useEffect, useMemo, useState } from 'react'
import { usePedidosEstado } from './use_pedidos_estado'
import { ESTADOS_PEDIDO } from '../services/servicio_flujo_pedidos'
import { agruparPedidosPorZona, escucharManifiestos, generarManifiesto, marcarManifiestoEntregado } from '../services/servicio_manifiestos'

// esto sirve para exponer zonas pendientes y manifiestos activos al repartidor
export function useManifiestos() {
  const { pedidos: listos_despacho, cargando: cargando_listos, error: error_listos } = usePedidosEstado(ESTADOS_PEDIDO.LISTO_DESPACHO)
  const { pedidos: pendientes_recoleccion, cargando: cargando_pendientes, error: error_pendientes } = usePedidosEstado(ESTADOS_PEDIDO.PENDIENTE_RECOLECCION)
  const { pedidos: pedidos_en_reparto, cargando: cargando_reparto, error: error_reparto } = usePedidosEstado(ESTADOS_PEDIDO.EN_REPARTO)
  const [manifiestos, setManifiestos] = useState([])
  const [cargando_manifiestos, set_cargando_manifiestos] = useState(true)
  const [error_manifiestos, set_error_manifiestos] = useState('')

  useEffect(() => {
    const detener = escucharManifiestos((datos) => {
      setManifiestos(datos)
      set_error_manifiestos('')
      set_cargando_manifiestos(false)
    }, () => {
      setManifiestos([])
      set_error_manifiestos('No se pudieron cargar los manifiestos')
      set_cargando_manifiestos(false)
    })
    return () => detener()
  }, [])

  // aqui maestro yo dejo pasar solo los pedidos que el empleado libero en el anden
  const pedidosParaAgrupar = useMemo(
    () => [...listos_despacho.filter((p) => p.liberadoParaRepartidor), ...pendientes_recoleccion],
    [listos_despacho, pendientes_recoleccion]
  )
  const zonasPendientes = useMemo(() => agruparPedidosPorZona(pedidosParaAgrupar), [pedidosParaAgrupar])

  const pedidosDelManifiesto = (manifiesto) => pedidos_en_reparto.filter((p) => p.manifiestoId === manifiesto.id)

  return {
    zonasPendientes,
    manifiestos,
    pedidosEnReparto: pedidos_en_reparto,
    cargando: cargando_listos || cargando_pendientes || cargando_reparto || cargando_manifiestos,
    error: error_listos || error_pendientes || error_reparto || error_manifiestos,
    generar: (zona, pedidos) => generarManifiesto(zona, pedidos),
    entregar: (manifiesto) => marcarManifiestoEntregado(manifiesto, pedidosDelManifiesto(manifiesto))
  }
}
