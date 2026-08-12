import { httpsCallable } from 'firebase/functions'
import { funciones } from './conexion_firebase'

export const enviar_nota_compra = async (pedido) => {
  await httpsCallable(funciones, 'enviar_nota_compra')({ pedido })
}
