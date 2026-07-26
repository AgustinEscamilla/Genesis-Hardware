import { addDoc, collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { db } from './conexion_firebase'
import { guardarPerfilUsuario } from './servicio_usuarios'

const coleccionPorRol = { empleado: 'empleados', repartidor: 'repartidores' }
const correoNormal = (correo = '') => String(correo).trim().toLowerCase()

const buscarStaff = async (rol, correo, uidAuth) => {
  const referencia = collection(db, coleccionPorRol[rol])
  if (uidAuth) {
    const por_uid = await getDocs(query(referencia, where('uidAuth', '==', uidAuth)))
    if (por_uid.docs[0]) return por_uid.docs[0]
  }
  const por_correo = await getDocs(query(referencia, where('correo', '==', correoNormal(correo))))
  return por_correo.docs[0]
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
