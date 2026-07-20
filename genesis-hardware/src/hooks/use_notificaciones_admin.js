import { useEffect, useState } from 'react'
import { escucharNotificacionesAdmin, marcarNotificacionLeida } from '../services/servicio_notificaciones'

// pos esto funciona para mantener la lista de notificaciones del administrador
export function useNotificacionesAdmin() {
  const [notificaciones, setNotificaciones] = useState([])

  useEffect(() => {
    return escucharNotificacionesAdmin(setNotificaciones)
  }, [])

  return { notificaciones, marcarLeida: marcarNotificacionLeida }
}
