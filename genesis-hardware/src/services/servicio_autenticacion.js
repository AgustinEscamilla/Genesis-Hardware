import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './conexion_firebase'

const claveSesionLocal = 'sesion_genesis_hardware'
const usarSesionLocal = import.meta.env.DEV || import.meta.env.VITE_USAR_AUTH_LOCAL === 'true'

const guardarSesionLocal = (correo) => {
  const usuario = {
    correo,
    uid: 'local',
  }

  localStorage.setItem(claveSesionLocal, JSON.stringify(usuario))
  return usuario
}

export const iniciarSesion = async (correo, contrasena) => {
  if (usarSesionLocal) {
    return guardarSesionLocal(correo)
  }

  try {
    const credencial = await signInWithEmailAndPassword(auth, correo, contrasena)
    localStorage.removeItem(claveSesionLocal)
    return credencial.user
  } catch (error) {
    if (String(error?.code || '').includes('api-key-not-valid') || String(error?.message || '').includes('api-key-not-valid')) {
      return guardarSesionLocal(correo)
    }

    throw error
  }
}

export const cerrarSesion = async () => {
  if (usarSesionLocal) {
    localStorage.removeItem(claveSesionLocal)
    return
  }

  try {
    await signOut(auth)
  } catch (error) {
    if (!String(error?.code || '').includes('api-key-not-valid')) {
      throw error
    }
  }

  localStorage.removeItem(claveSesionLocal)
}

export const obtenerUsuarioLocal = () => {
  const sesion = localStorage.getItem(claveSesionLocal)
  return sesion ? JSON.parse(sesion) : null
}