import { useMemo } from 'react'
import { ESTADOS_PEDIDO, actualizarEstadoPedido } from '../services/servicio_flujo_pedidos'
import { useTodosPedidos } from './use_todos_pedidos'
import { useOperacionesDistribuidor } from './use_operaciones_distribuidor'
import { actualizarOperacionDistribuidor, convertirOperacionEnPedido } from '../services/servicio_operaciones_distribuidor'

// esto sirve para juntar en una sola lista los pedidos que el empleado debe empacar
export function usePedidosPagadosEmpleado() {
  const { pedidos: pedidos_totales, cargando: cargando_pedidos, error: error_pedidos } = useTodosPedidos()
  const { operaciones, cargando: cargando_abastecimiento } = useOperacionesDistribuidor()

  const pedidos = useMemo(() => {
    const pedidos_cliente = pedidos_totales.filter((pedido) => pedido.origen === 'cliente')
    const recien_pagados = pedidos_cliente.filter((pedido) => [ESTADOS_PEDIDO.RECIBIDO, ESTADOS_PEDIDO.PENDIENTE_RECOLECCION].includes(pedido.estado)).map((pedido) => ({
      pedido,
      acciones: [{ texto: 'Comenzar Empaquetado', alClick: () => actualizarEstadoPedido(pedido, ESTADOS_PEDIDO.EN_EMPAQUE) }]
    }))
    const en_proceso = pedidos_cliente.filter((pedido) => pedido.estado === ESTADOS_PEDIDO.EN_EMPAQUE).map((pedido) => ({
      pedido,
      acciones: [{ texto: 'Marcar Listo para Despacho', alClick: () => actualizarEstadoPedido(pedido, ESTADOS_PEDIDO.LISTO_DESPACHO) }]
    }))
    const solicitudes = operaciones.filter((item) => ['recibido', 'en_empaque'].includes(item.estado)).map((item) => ({
      pedido: { id: item.id, estado: item.estado, esAbastecimiento: true, zonaLogistica: 'Campeche', direccionEntrega: item.direccion, carrito: item.items.map((producto) => ({ id: producto.sku_distribuidor, nombre: producto.nombre_producto, cantidad: producto.cantidad })) },
      acciones: [{ texto: item.estado === 'recibido' ? 'Comenzar Empaquetado' : 'Marcar Listo para Despacho', alClick: () => item.estado === 'recibido' ? actualizarOperacionDistribuidor(item.id, 'en_empaque') : convertirOperacionEnPedido(item) }]
    }))
    return [...recien_pagados, ...en_proceso, ...solicitudes]
  }, [pedidos_totales, operaciones])

  return {
    pedidos,
    cargando: cargando_pedidos || cargando_abastecimiento,
    error: error_pedidos
  }
}
