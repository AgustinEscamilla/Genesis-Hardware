import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { auth } from '../services/conexion_firebase'
import { guardarOnboardingStaff } from '../services/servicio_onboarding_staff'

export function useOnboardingStaff({ rol, rutaPanel, datosIniciales }) {
  const [parametros] = useSearchParams()
  const [datos, setDatos] = useState(datosIniciales)
  const navegar = useNavigate()

  const cambiarDato = (evento) => setDatos({ ...datos, [evento.target.name]: evento.target.value })

  // aqui maestro yo completo perfil y libero acceso al panel
  const guardar = async (evento) => {
    evento.preventDefault()
    const correo = parametros.get('correo') || auth.currentUser?.email || ''
    await guardarOnboardingStaff({ rol, correo, uidAuth: auth.currentUser?.uid || '', datos })
    navegar(rutaPanel, { replace: true })
  }

  return { datos, cambiarDato, guardar }
}