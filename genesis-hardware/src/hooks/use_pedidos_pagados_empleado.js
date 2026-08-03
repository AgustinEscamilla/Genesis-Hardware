import { useMemo } from 'react'
import { usePedidosEstado } from './use_pedidos_estado'
import { ESTADOS_PEDIDO, actualizarEstadoPedido } from '../services/servicio_flujo_pedidos'

// esto sirve para juntar en una sola lista los pedidos que el empleado debe empacar
export function usePedidosPagadosEmpleado() {
  const { pedidos: recibidos, cargando: cargando_recibidos, error: error_recibidos } = usePedidosEstado(ESTADOS_PEDIDO.RECIBIDO)
  const { pedidos: pendientes, cargando: cargando_pendientes, error: error_pendientes } = usePedidosEstado(ESTADOS_PEDIDO.PENDIENTE_RECOLECCION)
  const { pedidos: en_empaque, cargando: cargando_empaque, error: error_empaque } = usePedidosEstado(ESTADOS_PEDIDO.EN_EMPAQUE)

  const pedidos = useMemo(() => {
    const recien_pagados = [...recibidos, ...pendientes].map((pedido) => ({
      pedido,
      acciones: [{ texto: 'Comenzar Empaquetado', alClick: () => actualizarEstadoPedido(pedido, ESTADOS_PEDIDO.EN_EMPAQUE) }]
    }))
    const en_proceso = en_empaque.map((pedido) => ({
      pedido,
      acciones: [{ texto: 'Marcar Listo para Despacho', alClick: () => actualizarEstadoPedido(pedido, ESTADOS_PEDIDO.LISTO_DESPACHO) }]
    }))
    return [...recien_pagados, ...en_proceso]
  }, [recibidos, pendientes, en_empaque])

  return {
    pedidos,
    cargando: cargando_recibidos || cargando_pendientes || cargando_empaque,
    error: error_recibidos || error_pendientes || error_empaque
  }
}
