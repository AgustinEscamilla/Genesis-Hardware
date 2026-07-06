import { useState } from 'react'
import { iniciarSesionConGoogle } from '../services/servicio_autenticacion'
import { guardarPerfilUsuario } from '../services/servicio_usuarios'

export function useAccesoGoogle() {
  const [cargando, setCargando] = useState(false)

  // aqui maestro yo abro google y guardo al cliente en firestore
  const iniciarAccesoGoogle = async () => {
    setCargando(true)
    try {
      const credencial = await iniciarSesionConGoogle()
      const usuario = credencial.user || credencial
      await guardarPerfilUsuario({ uidAuth: usuario.uid, nombre: usuario.displayName || 'Cliente', correo: usuario.email || '', rol: 'cliente', origen: 'google' })
      return usuario
    } finally { setCargando(false) }
  }

  return { cargando, iniciarAccesoGoogle }
}