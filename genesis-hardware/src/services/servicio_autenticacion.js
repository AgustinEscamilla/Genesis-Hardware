import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from './conexion_firebase'
import { guardar_sesion_local, limpiar_sesion_local, normalizar_correo, usar_sesion_local } from './servicio_sesion_local'

export const iniciarSesionConCorreo = async (correo, contrasena) => {
  const correo_normalizado = normalizar_correo(correo)
  if (usar_sesion_local) return guardar_sesion_local(correo_normalizado)
  try {
    const credencial = await signInWithEmailAndPassword(auth, correo_normalizado, contrasena)
    limpiar_sesion_local()
    return credencial.user
  } catch (error) {
    if (String(error?.code || '').includes('api-key-not-valid')) return guardar_sesion_local(correo_normalizado)
    throw error
  }
}

export const iniciarSesionConGoogle = async () => {
  if (usar_sesion_local) return guardar_sesion_local('cliente-local@genesis.com')
  const proveedorGoogle = new GoogleAuthProvider()
  proveedorGoogle.setCustomParameters({ prompt: 'select_account' })
  return signInWithPopup(auth, proveedorGoogle)
}

export const cerrarSesion = async () => {
  try { await signOut(auth) } catch (error) {
    if (!usar_sesion_local && !String(error?.code || '').includes('api-key-not-valid')) throw error
  }
  limpiar_sesion_local()
}
