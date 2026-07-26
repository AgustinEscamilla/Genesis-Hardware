import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAutenticacion } from './use_autenticacion'
import { guardarOnboardingStaff } from '../services/servicio_onboarding_staff'

export function useOnboardingStaff({ rol, rutaPanel, datosIniciales }) {
  const [parametros] = useSearchParams()
  const { usuarioActual } = useAutenticacion()
  const [datos, setDatos] = useState(datosIniciales)
  const [guardando, setGuardando] = useState(false)
  const [mensaje_error, setMensajeError] = useState('')
  const navegar = useNavigate()

  const cambiarDato = (evento) => setDatos((actual) => ({ ...actual, [evento.target.name]: evento.target.value }))

  const guardar = async (evento) => {
    evento.preventDefault()
    if (!usuarioActual?.uid || guardando) return
    setGuardando(true)
    setMensajeError('')
    const correo = parametros.get('correo') || usuarioActual.email || usuarioActual.correo || ''
    try {
      await guardarOnboardingStaff({ rol, correo, uidAuth: usuarioActual.uid, datos })
      navegar(rutaPanel, { replace: true })
    } catch { setMensajeError('No se pudo guardar el registro') }
    finally { setGuardando(false) }
  }

  return { datos, cambiarDato, guardar, guardando, mensaje_error }
}
