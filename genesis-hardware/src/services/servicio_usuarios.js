import { collection, doc, getDoc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './conexion_firebase'
import { rutas_por_rol } from './constantes_autorizacion'

const referenciaUsuario = (uidAuth) => doc(db, 'usuarios', uidAuth)
const dominiosPorRol = { administrador: ['@admin.genesis.com'], empleado: ['@empleado.com', '@genesis.com'], repartidor: ['@repartidor.com'], cliente: ['@gmail.com'] }

const correoTerminaCon = (correo, lista) => lista.some((dominio) => correo.endsWith(dominio))
const esSesionLocal = (uidAuth = '') => String(uidAuth).startsWith('uid-local')

// aqui maestro yo valido dominios exactos para evitar cruces entre paneles
export const inferirRolPorCorreo = (correo = '') => {
  const correoNormalizado = String(correo).trim().toLowerCase()
  if (correoTerminaCon(correoNormalizado, dominiosPorRol.administrador)) return 'administrador'
  if (correoTerminaCon(correoNormalizado, dominiosPorRol.empleado)) return 'empleado'
  if (correoTerminaCon(correoNormalizado, dominiosPorRol.repartidor)) return 'repartidor'
  if (correoTerminaCon(correoNormalizado, dominiosPorRol.cliente)) return 'cliente'
  return null
}

// esto sirve yo dejo un registro unico para cruzar uid y rol real
export const guardarPerfilUsuario = async ({ uidAuth, nombre, correo, rol, origen }) => {
  await setDoc(referenciaUsuario(uidAuth), { uidAuth, nombre, correo, rol, origen, estado: 'Activo', actualizadoEn: serverTimestamp() }, { merge: true })
}

// aqui maestro yo leo el perfil que decide la ruta final
export const buscarPerfilUsuario = async (uidAuth) => {
  const snapshot = await getDoc(referenciaUsuario(uidAuth))
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
}

export const actualizarPerfilUsuario = async (uidAuth, datos) => {
  await setDoc(referenciaUsuario(uidAuth), { ...datos, actualizadoEn: serverTimestamp() }, { merge: true })
}

export const escucharUsuarios = (alCambiar) => onSnapshot(collection(db, 'usuarios'), (snap) => alCambiar(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))

// aqui maestro yo resuelvo la ruta del panel usando firestore y el respaldo local de desarrollo
export const resolverRutaAccesoUsuario = async ({ uidAuth, correo }) => {
  const rol = inferirRolPorCorreo(correo)
  if (esSesionLocal(uidAuth) && rol) return rutas_por_rol[rol]
  const perfil = uidAuth ? await buscarPerfilUsuario(uidAuth) : null
  if (perfil?.rol) return rutas_por_rol[String(perfil.rol).toLowerCase()] || '/'
  if (rol) return rutas_por_rol[rol]
  return '/'
}
