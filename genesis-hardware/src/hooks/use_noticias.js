import { useEffect, useState } from 'react'
import { actualizarNoticia, agregarNoticia, eliminarNoticia, obtenerNoticias, sembrarNoticiasIniciales } from '../services/servicio_noticias'

// aqui maestro yo manejo el estado de las noticias y todas sus operaciones
export function useNoticias() {
  const [noticias, setNoticias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [seleccionada, setSeleccionada] = useState(null)
  const [recarga, setRecarga] = useState(0)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    let activo = true
    obtenerNoticias().then(async datos => {
      const resultado = datos.length ? datos : await sembrarNoticiasIniciales()
      if (activo) setNoticias(resultado)
    }).catch(() => activo && setMensaje('No se pudieron cargar las noticias')).finally(() => activo && setCargando(false))
    return () => { activo = false }
  }, [recarga])

  const guardar = async (datos) => {
    // esto sirve para actualizar o agregar segun si hay linea seleccionada
    setGuardando(true)
    setMensaje('')
    try {
      if (seleccionada) await actualizarNoticia(seleccionada.id, datos)
      else await agregarNoticia(datos)
      setSeleccionada(null)
      setRecarga(n => n + 1)
      setMensaje('Noticia guardada correctamente')
    } catch { setMensaje('No se pudo guardar la noticia') }
    finally { setGuardando(false) }
  }

  const eliminar = async (id) => {
    setGuardando(true)
    try { await eliminarNoticia(id); setRecarga(n => n + 1); setMensaje('Noticia eliminada correctamente') } catch { setMensaje('No se pudo eliminar la noticia') } finally { setGuardando(false) }
  }

  return { noticias, cargando, guardando, mensaje, seleccionada, setSeleccionada, guardar, eliminar }
}
