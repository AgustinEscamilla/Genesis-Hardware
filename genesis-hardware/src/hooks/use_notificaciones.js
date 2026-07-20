import { useEffect, useState } from 'react'
import { escucharNotificacionesCliente, marcarNotificacionLeida } from '../services/servicio_notificaciones'

// pos esto funciona para mantener sincronizadas las notificaciones del cliente
export function useNotificaciones(clienteId) {
  const [notificaciones, setNotificaciones] = useState([])

  useEffect(() => {
    if (!clienteId) return undefined
    return escucharNotificacionesCliente(clienteId, setNotificaciones)
  }, [clienteId])

  return { notificaciones, marcarLeida: marcarNotificacionLeida }
}
