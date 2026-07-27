import { useEffect, useState } from 'react'
import { escucharInventario } from '../services/servicio_inventario'

// esto sirve para escuchar el inventario en tiempo real para los empleados
export function useInventarioLista() {
  const [inventario, setInventario] = useState([])
  const [cargando, set_cargando] = useState(true)
  const [error, set_error] = useState('')

  useEffect(() => {
    const stop = escucharInventario((datos) => {
      setInventario(datos)
      set_error('')
      set_cargando(false)
    }, () => {
      setInventario([])
      set_error('No se pudo cargar el inventario')
      set_cargando(false)
    })
    return () => stop()
  }, [])

  return { inventario, cargando, error }
}
