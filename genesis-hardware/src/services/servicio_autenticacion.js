import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from './conexion_firebase'

const claveSesionLocal = 'sesion_genesis_hardware'
const eventoSesionLocal = 'sesion-genesis-hardware-cambio'
const usarSesionLocal = import.meta.env.DEV || import.meta.env.VITE_USAR_AUTH_LOCAL === 'true'
const normalizarCorreo = (correo = '') => String(correo).trim().toLowerCase()

const notificarCambioSesionLocal = () => {
  window.dispatchEvent(new Event(eventoSesionLocal))
}

// aqui maestro yo separo la sesion local del acceso real de firebase
const guardarSesionLocal = (correo) => {
  const correoNormalizado = normalizarCorreo(correo)
  const uidLocal = `uid-local-${correoNormalizado.replace(/[^a-z0-9]/g, '-')}`
  const usuario = { correo: correoNormalizado, email: correoNormalizado, uid: uidLocal }
  localStorage.setItem(claveSesionLocal, JSON.stringify(usuario))
  notificarCambioSesionLocal()
  return usuario
}

const limpiarSesionLocal = () => {
  localStorage.removeItem(claveSesionLocal)
  notificarCambioSesionLocal()
}

export const iniciarSesionConCorreo = async (correo, contrasena) => {
  const correoNormalizado = normalizarCorreo(correo)
  if (usarSesionLocal) return guardarSesionLocal(correoNormalizado)
  try {
    const credencial = await signInWithEmailAndPassword(auth, correoNormalizado, contrasena)
    limpiarSesionLocal()
    return credencial.user
  } catch (error) {
    if (String(error?.code || '').includes('api-key-not-valid')) return guardarSesionLocal(correoNormalizado)
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