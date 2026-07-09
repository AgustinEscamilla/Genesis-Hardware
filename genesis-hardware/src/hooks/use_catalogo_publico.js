import { useEffect, useState } from 'react'
import { obtenerCatalogo } from '../services/servicio_catalogo'

// aqui maestro yo cargo el catalogo publico desde firestore para el menu principal
export function useCatalogoPublico() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    // pos esto funciona para traer los productos y mostrarlos en la seccion publica
    obtenerCatalogo().then(datos => {
      setProductos(datos)
      setCargando(false)
    })
  }, [])

  return { productos, cargando }
}
