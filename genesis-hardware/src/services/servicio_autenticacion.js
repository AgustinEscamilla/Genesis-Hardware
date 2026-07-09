import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from './conexion_firebase'

const claveSesionLocal = 'sesion_genesis_hardware'
const usarSesionLocal = import.meta.env.DEV || import.meta.env.VITE_USAR_AUTH_LOCAL === 'true'

// aqui maestro yo separo la sesion local del acceso real de firebase
const guardarSesionLocal = (correo) => {
  const usuario = { correo, uid: 'uid-local-desarrollo' }
  localStorage.setItem(claveSesionLocal, JSON.stringify(usuario))
  return usuario
}

const limpiarSesionLocal = () => localStorage.removeItem(claveSesionLocal)

export const iniciarSesionConCorreo = async (correo, contrasena) => {
  if (usarSesionLocal) return guardarSesionLocal(correo)
  try {
    const credencial = await signInWithEmailAndPassword(auth, correo, contrasena)
    limpiarSesionLocal()
    return credencial.user
  } catch (error) {
    if (String(error?.code || '').includes('api-key-not-valid')) return guardarSesionLocal(correo)
    throw error
  }
}

// aqui maestro yo abro el popup de google para entregar la sesion al hook
export const iniciarSesionConGoogle = async () => {
  if (usarSesionLocal) return guardarSesionLocal('cliente-local@genesis.com')
  const proveedor = new GoogleAuthProvider()
  return signInWithPopup(auth, proveedor)
}

export const cerrarSesion = async () => {
  try { await signOut(auth) } catch (error) { if (!usarSesionLocal && !String(error?.code || '').includes('api-key-not-valid')) throw error }
  limpiarSesionLocal()
}

export const obtenerUsuarioLocal = () => {
  const sesion = localStorage.getItem(claveSesionLocal)
  return sesion ? JSON.parse(sesion) : null
}