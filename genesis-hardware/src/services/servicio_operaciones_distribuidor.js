import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from './conexion_firebase'

export const escucharOperacionesDistribuidor = (al_cambiar, al_error) => {
  const referencia = query(collection(db, 'pedidos_distribuidor'), orderBy('fecha', 'desc'), limit(50))
  return onSnapshot(referencia, (instantanea) => {
    al_cambiar(instantanea.docs.map((documento) => ({ id: documento.id, ...documento.data() })))
  }, al_error)
}
