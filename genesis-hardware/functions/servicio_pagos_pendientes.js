import { db } from './base_firebase.js'

const coleccion = () => db.collection('pagos_pendientes')

export const guardar_pago_pendiente = async (datos) => {
  await coleccion().doc(String(datos.pago_id)).set({ ...datos, actualizado_en: new Date().toISOString() }, { merge: true })
}

export const obtener_pago_pendiente = async (pago_id) => {
  const documento = await coleccion().doc(String(pago_id)).get()
  return documento.exists ? { id: documento.id, ...documento.data() } : null
}
