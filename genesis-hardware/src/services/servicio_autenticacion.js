import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { aplicacion } from './conexion_firebase'

export const autenticacion = getAuth(aplicacion)

export const iniciarSesion = async (correo, contrasena) => {
  const credenciales = await signInWithEmailAndPassword(autenticacion, correo, contrasena)
  return credenciales.user
}

export const cerrarSesion = async () => {
  await signOut(autenticacion)
}