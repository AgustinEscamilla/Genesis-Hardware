import { useEffect, useState } from 'react'
import { obtenerCatalogo } from '../services/servicio_catalogo'

// aqui maestro yo cargo el catalogo publico desde firestore para el menu principal
export function useCatalogoPublico() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    let activo = true

    const cargarCatalogo = async () => {
      try {
        const timeoutMs = 8000
        const datos = await Promise.race([
          obtenerCatalogo(),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout al cargar catalogo')), timeoutMs)
          )
        ])
        if (!activo) return
        setProductos(datos)
      } catch (error) {
        // esto sirve yo mantengo visible la interfaz si falla firestore o la red
        if (!activo) return
        console.error('No se pudo cargar el catalogo publico:', error)
        setProductos([])
      } finally {
        if (activo) setCargando(false)
      }
    }

    cargarCatalogo()

    return () => {
      activo = false
    }
  }, [])

  return { productos, cargando }
}
