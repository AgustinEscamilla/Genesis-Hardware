import { useEffect, useState } from 'react'
import { escucharInventario } from '../services/servicio_inventario'

// esto sirve para escuchar el inventario en tiempo real para los empleados
export function useInventarioLista() {
  const [inventario, setInventario] = useState([])

  useEffect(() => {
    return escucharInventario(setInventario)
  }, [])

  return { inventario }
}
