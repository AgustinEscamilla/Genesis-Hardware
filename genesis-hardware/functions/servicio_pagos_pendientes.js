import { db } from './base_firebase.js'

const coleccion = () => db.collection('pagos_pendientes')

export const guardar_pago_pendiente = async (datos) => {
  const clave = datos.referencia || datos.pago_id
  await coleccion().doc(String(clave)).set({ ...datos, actualizado_en: new Date().toISOString() }, { merge: true })
}

export const obtener_pago_pendiente = async (referencia) => {
  const documento = await coleccion().doc(String(referencia)).get()
  return documento.exists ? { id: documento.id, ...documento.data() } : null
}
