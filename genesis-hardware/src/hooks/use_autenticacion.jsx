import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../services/conexion_firebase'
import { obtenerUsuarioLocal } from '../services/servicio_autenticacion'

const usarSesionLocal = import.meta.env.DEV || import.meta.env.VITE_USAR_AUTH_LOCAL === 'true'

export function useAutenticacion() {
  const [usuarioActual, setUsuarioActual] = useState(() => obtenerUsuarioLocal())
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (usarSesionLocal) {
      setUsuarioActual(obtenerUsuarioLocal())
      setCargando(false)
      return undefined
    }

    const usuarioLocal = obtenerUsuarioLocal()

    if (usuarioLocal) {
      setUsuarioActual(usuarioLocal)
      setCargando(false)
      return undefined
    }

    const observador = onAuthStateChanged(auth, (user) => {
      setUsuarioActual(user)
      setCargando(false)
    })

    return () => observador()
  }, [])

  return { usuarioActual, cargando }
}