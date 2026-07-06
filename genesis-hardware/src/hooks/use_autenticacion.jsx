import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../services/conexion_firebase'
import { obtenerUsuarioLocal } from '../services/servicio_autenticacion'

const usarSesionLocal = import.meta.env.DEV || import.meta.env.VITE_USAR_AUTH_LOCAL === 'true'
const sesionInicial = obtenerUsuarioLocal()

export function useAutenticacion() {
  const [usuarioActual, setUsuarioActual] = useState(() => sesionInicial)
  const [cargando, setCargando] = useState(!sesionInicial && !usarSesionLocal)

  useEffect(() => {
    if (usarSesionLocal || sesionInicial) return undefined

    const observador = onAuthStateChanged(auth, (user) => {
      setUsuarioActual(user)
      setCargando(false)
    })

    return () => observador()
  }, [])

  return { usuarioActual, cargando }
}