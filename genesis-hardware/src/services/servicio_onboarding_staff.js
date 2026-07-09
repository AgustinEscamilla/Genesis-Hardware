import { addDoc, collection, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from './conexion_firebase'
import { guardarPerfilUsuario } from './servicio_usuarios'

const coleccionPorRol = { empleado: 'empleados', repartidor: 'repartidores' }
const correoNormal = (correo = '') => String(correo).trim().toLowerCase()

const buscarStaff = async (rol, correo, uidAuth) => {
  const snapshot = await getDocs(collection(db, coleccionPorRol[rol]))
  return snapshot.docs.find((item) => {
    const data = item.data() || {}
    return correoNormal(data.correo) === correoNormal(correo) || (uidAuth && data.uidAuth === uidAuth)
  })
}

export const requiereOnboardingStaff = async ({ rol, correo, uidAuth }) => {
  if (!coleccionPorRol[rol]) return false
  const registro = await buscarStaff(rol, correo, uidAuth)
  if (!registro) return true
  return !registro.data()?.onboardingCompleto
}

export const guardarOnboardingStaff = async ({ rol, correo, uidAuth, datos }) => {
  // aqui maestro yo guardo onboarding completo para staff
  const registro = await buscarStaff(rol, correo, uidAuth)
  const payload = { ...datos, onboardingCompleto: true, estadoActivo: true, actualizadoEn: serverTimestamp() }
  const nombrePerfil = `${datos.nombres || ''} ${datos.apellidoPaterno || ''} ${datos.apellidoMaterno || ''}`.trim()
  if (registro) await updateDoc(doc(db, coleccionPorRol[rol], registro.id), payload)
  else await addDoc(collection(db, coleccionPorRol[rol]), { correo, uidAuth, rol, ...payload, creadoEn: serverTimestamp() })
  await guardarPerfilUsuario({ uidAuth, nombre: nombrePerfil || 'Staff', correo, rol, origen: rol })
}