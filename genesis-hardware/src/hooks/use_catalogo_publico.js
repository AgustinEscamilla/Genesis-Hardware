import { useEffect, useState } from 'react'
import { escucharCatalogo } from '../services/servicio_catalogo'

// aqui maestro yo cargo el catalogo publico desde firestore para el menu principal
export function useCatalogoPublico() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    let activo = true

    const detener = escucharCatalogo((datos) => { if (activo) { setProductos(datos); setCargando(false) } }, () => { if (activo) { setProductos([]); setCargando(false) } })
    return () => { activo = false; detener() }
  }, [])

  return { productos, cargando }
}
