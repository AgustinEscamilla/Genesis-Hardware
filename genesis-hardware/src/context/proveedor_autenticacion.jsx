// aqui maestro yo documente este archivo para mantener trazabilidad
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../services/conexion_firebase'
import { evento_sesion_local, obtener_usuario_local, usar_sesion_local } from '../services/servicio_sesion_local'
import { useRolSesion } from '../hooks/use_rol_sesion'
import { ContextoAutenticacion } from './contexto_autenticacion'

// esto sirve para escuchar la sesion una sola vez y compartirla en toda la app
export function ProveedorAutenticacion({ children }) {
  const usuarioLocalInicial = obtener_usuario_local()
  const [usuarioActual, setUsuarioActual] = useState(() => usuarioLocalInicial)
  const [cargando, setCargando] = useState(() => !usuarioLocalInicial && !usar_sesion_local)
  const rol = useRolSesion(usuarioActual)

  useEffect(() => {
    if (usar_sesion_local) {
      const sincronizarSesionLocal = () => {
        setUsuarioActual(obtener_usuario_local())
        setCargando(false)
      }

      sincronizarSesionLocal()
      window.addEventListener(evento_sesion_local, sincronizarSesionLocal)
      window.addEventListener('storage', sincronizarSesionLocal)

      return () => {
        window.removeEventListener(evento_sesion_local, sincronizarSesionLocal)
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
    <ContextoAutenticacion.Provider value={{ usuarioActual, cargando, rol }}>
      {children}
    </ContextoAutenticacion.Provider>
  )
}
