import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { autenticacion } from '../services/servicio_autenticacion'

export function useAutenticacion() {
  const [usuarioActual, setUsuarioActual] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cancelarSuscripcion = onAuthStateChanged(autenticacion, (usuario) => {
      setUsuarioActual(usuario)
      setCargando(false)
    })
    
    return () => cancelarSuscripcion()
  }, [])

  return { usuarioActual, cargando }
}