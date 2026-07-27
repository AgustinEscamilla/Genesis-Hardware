import { useEffect, useState } from 'react'
import { escucharPedidosPorEstado } from '../services/servicio_flujo_pedidos'

// esto sirve para mantener sincronizado un bloque de pedidos por estado
export function usePedidosEstado(estado) {
  const [pedidos, setPedidos] = useState([])
  const [cargando, set_cargando] = useState(true)
  const [error, set_error] = useState('')

  useEffect(() => {
    const stop = escucharPedidosPorEstado(estado, (datos) => {
      setPedidos(datos)
      set_error('')
      set_cargando(false)
    }, () => {
      setPedidos([])
      set_error('No se pudieron cargar los pedidos')
      set_cargando(false)
    })
    return () => stop()
  }, [estado])

  return { pedidos, cargando, error }
}
