import { useEffect, useState } from 'react'
import { obtenerLineas } from '../services/servicio_lineas'

// aqui maestro yo cargo las lineas de producto para mostrarlas en el menu publico
export function useLineasPublico() {
  const [lineas, setLineas] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    // esto sirve para traer las lineas del catalogo publico desde firestore
    obtenerLineas().then(datos => {
      setLineas(datos)
      setCargando(false)
    })
  }, [])

  return { lineas, cargando }
}
