import { useEffect, useState } from 'react'
import { escucharPedidosCliente } from '../services/servicio_seguimiento_pedidos'

// esto sirve para exponer los pedidos de un cliente con su historial de estados
export function useSeguimientoPedidos(clienteId) {
  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
    if (!clienteId) return undefined
    return escucharPedidosCliente(clienteId, setPedidos)
  }, [clienteId])

  return { pedidos }
}
