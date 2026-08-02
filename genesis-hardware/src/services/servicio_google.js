import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from './conexion_firebase'

export const abrirPopupGoogle = async () => {
  // aqui maestro yo abro el popup de google para clientes y fuerzo el selector de cuentas
  const proveedorGoogle = new GoogleAuthProvider()
  proveedorGoogle.setCustomParameters({ prompt: 'select_account' })
  return signInWithPopup(auth, proveedorGoogle)
}