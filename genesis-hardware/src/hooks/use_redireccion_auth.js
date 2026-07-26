import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAutenticacion } from './use_autenticacion'
import { resolverRutaAcceso } from '../services/servicio_rutas_acceso'

export function useRedireccionAuth() {
  const navegar = useNavigate()
  const { usuarioActual, cargando: cargando_sesion } = useAutenticacion()
  const [uid_procesado, setUidProcesado] = useState(null)

  useEffect(() => {
    if (cargando_sesion) return undefined
    if (!usuarioActual || uid_procesado === usuarioActual.uid) return undefined
    let activo = true
    resolverRutaAcceso({ uidAuth: usuarioActual.uid, correo: usuarioActual.email || usuarioActual.correo || '' })
      .then((ruta) => {
        if (!activo) return
        setUidProcesado(usuarioActual.uid)
        navegar(ruta, { replace: true })
      })
      .catch(() => activo && setUidProcesado(usuarioActual.uid))
    return () => { activo = false }
  }, [cargando_sesion, uid_procesado, usuarioActual, navegar])

  return { cargando: cargando_sesion || Boolean(usuarioActual && uid_procesado !== usuarioActual.uid) }
}
