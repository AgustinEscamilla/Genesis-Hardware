import { useEffect, useState } from 'react'
import { escucharTodosLosPedidos } from '../services/servicio_flujo_pedidos'

export function useTodosPedidos() {
  const [pedidos, set_pedidos] = useState([])
  const [cargando, set_cargando] = useState(true)
  const [error, set_error] = useState('')
  useEffect(() => escucharTodosLosPedidos((datos) => { set_pedidos(datos); set_cargando(false) }, () => { set_error('No se pudieron cargar los pedidos'); set_cargando(false) }), [])
  return { pedidos, cargando, error }
}
