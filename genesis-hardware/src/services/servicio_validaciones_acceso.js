import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from './conexion_firebase'
import { inferirRolPorCorreo } from './servicio_usuarios'

const existeCuenta = async (nombreColeccion, uidAuth) => {
  if (!uidAuth) return false
  const consulta = query(collection(db, nombreColeccion), where('uidAuth', '==', uidAuth))
  const snapshot = await getDocs(consulta)
  return !snapshot.empty
}

export const validarAccesoCorreoContrasena = async (correo, uidAuth) => {
  // aqui maestro yo permito solo staff por correo y contrasena
  const rolDetectado = inferirRolPorCorreo(correo)
  if (!rolDetectado) return { permitido: false, mensaje: 'Cuenta invalida' }
  if (rolDetectado === 'cliente') return { permitido: false, mensaje: 'Clientes deben usar acceso con Google' }
  if (rolDetectado === 'administrador') return { permitido: true, mensaje: '' }
  const coleccion = rolDetectado === 'repartidor' ? 'repartidores' : 'empleados'
  const existeStaff = await existeCuenta(coleccion, uidAuth)
  if (existeStaff) return { permitido: true, mensaje: '' }
  return { permitido: false, mensaje: 'Cuenta invalida' }
}
