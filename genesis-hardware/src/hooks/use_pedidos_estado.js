import { useEffect, useState } from 'react'
import { escucharPedidosPorEstado } from '../services/servicio_flujo_pedidos'

// esto sirve para mantener sincronizado un bloque de pedidos por estado
export function usePedidosEstado(estado) {
  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
    const stop = escucharPedidosPorEstado(estado, setPedidos)
    return () => stop()
  }, [estado])

  return { pedidos }
}
