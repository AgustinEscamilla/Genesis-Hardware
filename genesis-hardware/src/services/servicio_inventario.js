import { addDoc, collection } from 'firebase/firestore'
import { db } from './conexion_firebase'

// aqui maestro yo defino la coleccion de inventario para registrar cada ingreso de mercancia
const coleccion = () => collection(db, 'inventario')

export const registrarMercancia = async (datos) => {
  // esto sirve para guardar en firestore el ingreso con fecha automatica
  await addDoc(coleccion(), {
    ...datos,
    fechaIngreso: new Date().toISOString()
  })
}
