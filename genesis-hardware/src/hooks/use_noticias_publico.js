import { useEffect, useState } from 'react'
import { obtenerNoticias } from '../services/servicio_noticias'

// aqui maestro yo cargo las noticias para mostrarlas en el menu publico
export function useNoticiasPublico() {
  const [noticias, setNoticias] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    obtenerNoticias().then(datos => setNoticias(datos)).catch(() => setNoticias([])).finally(() => setCargando(false))
  }, [])

  return { noticias, cargando }
}
