import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../services/conexion_firebase'
import { resolverRutaAcceso } from '../services/servicio_rutas_acceso'

export function useRedireccionAuth() {
  const navegar = useNavigate()
  const [cargando, setCargando] = useState(true)

  // aqui maestro el uid y mando cada rol a su panel
  useEffect(() => onAuthStateChanged(auth, async (usuario) => {
    if (!usuario) return setCargando(false)
    navegar(await resolverRutaAcceso({ uidAuth: usuario.uid, correo: usuario.email || '' }), { replace: true })
    setCargando(false)
  }), [navegar])

  return { cargando }
}