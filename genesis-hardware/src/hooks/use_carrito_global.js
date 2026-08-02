import { useContext } from 'react'
import { ContextoCarrito } from '../context/contexto_carrito'

export function useCarritoGlobal() {
  return useContext(ContextoCarrito)
}
