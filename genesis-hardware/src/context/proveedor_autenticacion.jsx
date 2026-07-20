// aqui maestro yo documente este archivo para mantener trazabilidad
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../services/conexion_firebase'
import { obtenerUsuarioLocal } from '../services/servicio_autenticacion'
import { ContextoAutenticacion } from './contexto_autenticacion'

const usarSesionLocal = import.meta.env.DEV || import.meta.env.VITE_USAR_AUTH_LOCAL === 'true'
const eventoSesionLocal = 'sesion-genesis-hardware-cambio'

// esto sirve para escuchar la sesion una sola vez y compartirla en toda la app
export function ProveedorAutenticacion({ children }) {
  const usuarioLocalInicial = obtenerUsuarioLocal()
  const [usuarioActual, setUsuarioActual] = useState(() => usuarioLocalInicial)
  const [cargando, setCargando] = useState(() => !usuarioLocalInicial && !usarSesionLocal)

  useEffect(() => {
    if (usarSesionLocal) {
      const sincronizarSesionLocal = () => {
        setUsuarioActual(obtenerUsuarioLocal())
        setCargando(false)
      }

      sincronizarSesionLocal()
      window.addEventListener(eventoSesionLocal, sincronizarSesionLocal)
      window.addEventListener('storage', sincronizarSesionLocal)

      return () => {
        window.removeEventListener(eventoSesionLocal, sincronizarSesionLocal)
        window.removeEventListener('storage', sincronizarSesionLocal)
      }
    }

    const observador = onAuthStateChanged(auth, (user) => {
      setUsuarioActual(user)
      setCargando(false)
    })

    return () => observador()
  }, [])

  return (
    <ContextoAutenticacion.Provider value={{ usuarioActual, cargando }}>
      {children}
    </ContextoAutenticacion.Provider>
  )
}
