import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './conexion_firebase'

const referenciaUsuario = (uidAuth) => doc(db, 'usuarios', uidAuth)
const rutasPorRol = { administrador: '/administrador', empleado: '/empleados', repartidor: '/repartidores', cliente: '/clientes' }
const inferirRutaDesdeCorreo = (correo = '') => {
  const correoNormalizado = String(correo).toLowerCase()
  if (correoNormalizado.includes('admin')) return rutasPorRol.administrador
  if (correoNormalizado.includes('empleado')) return rutasPorRol.empleado
  if (correoNormalizado.includes('repartidor')) return rutasPorRol.repartidor
  return rutasPorRol.cliente
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

// aqui maestro yo resuelvo la ruta del panel usando firestore y el respaldo local de desarrollo
export const resolverRutaAccesoUsuario = async ({ uidAuth, correo }) => {
  const perfil = uidAuth ? await buscarPerfilUsuario(uidAuth) : null
  if (perfil?.rol) return rutasPorRol[String(perfil.rol).toLowerCase()] || '/autenticacion'
  if (correo) return inferirRutaDesdeCorreo(correo)
  return '/autenticacion'
}