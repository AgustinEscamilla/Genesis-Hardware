import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { abrirPopupGoogle } from '../services/servicio_google'
import { guardarPerfilUsuario } from '../services/servicio_usuarios'

export function useAccesoGoogle() {
  const [cargando, setCargando] = useState(false)
  const [mensajeError, setMensajeError] = useState('')
  const navegar = useNavigate()

  // esto sirve yo guardo perfil cliente y mando al panel clientes
  const accederConGoogle = async () => {
    setCargando(true)
    setMensajeError('')
    try {
      const credencial = await abrirPopupGoogle()
      const usuario = credencial.user || credencial
      await guardarPerfilUsuario({ uidAuth: usuario.uid, nombre: usuario.displayName || 'Cliente', correo: usuario.email || '', rol: 'cliente', origen: 'google' })
      navegar('/clientes', { replace: true })
      return true
    } catch (error) {
      setMensajeError(error?.message || 'No se pudo iniciar sesion con Google')
      return false
    } finally { setCargando(false) }
  }

  return { cargando, mensajeError, accederConGoogle }
}