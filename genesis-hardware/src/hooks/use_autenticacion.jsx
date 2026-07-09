import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../services/conexion_firebase'
import { obtenerUsuarioLocal } from '../services/servicio_autenticacion'

const usarSesionLocal = import.meta.env.DEV || import.meta.env.VITE_USAR_AUTH_LOCAL === 'true'

export function useAutenticacion() {
  const usuarioLocal = obtenerUsuarioLocal()
  const [usuarioActual, setUsuarioActual] = useState(() => usuarioLocal)
  const [cargando, setCargando] = useState(() => !usuarioLocal && !usarSesionLocal)

  useEffect(() => {
    if (usarSesionLocal || usuarioLocal) return undefined

    const observador = onAuthStateChanged(auth, (user) => {
      setUsuarioActual(user)
      setCargando(false)
    })

    return () => observador()
  }, [usuarioLocal])

  return { usuarioActual, cargando }
}