import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from './conexion_firebase'

export const abrirPopupGoogle = async () => {
  // aqui maestro yo abro el popup de google para clientes
  const proveedorGoogle = new GoogleAuthProvider()
  return signInWithPopup(auth, proveedorGoogle)
}