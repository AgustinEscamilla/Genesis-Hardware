import { db } from './base_firebase.js'

const coleccion_auditoria = () => db.collection('auditoria_operaciones')

const construir_registro = ({ usuario, rol, accion, coleccion, documento_id, valores_viejos = null, valores_nuevos = null }) => ({
  usuario: String(usuario || 'sistema'),
  rol: String(rol || 'sistema'),
  fecha: new Date().toISOString(),
  accion: String(accion || 'sin_accion'),
  coleccion: String(coleccion || 'sin_coleccion'),
  documento_id: String(documento_id || 'sin_documento'),
  valores_viejos,
  valores_nuevos,
})

export const registrar_auditoria = (datos, transaccion = null) => {
  const referencia = coleccion_auditoria().doc()
  const registro = construir_registro(datos)
  if (transaccion) return transaccion.create(referencia, registro)
  return referencia.create(registro)
}
