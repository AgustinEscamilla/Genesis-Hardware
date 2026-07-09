import { collection, getDocs } from 'firebase/firestore'
import { db } from './conexion_firebase'
import { inferirRolPorCorreo } from './servicio_usuarios'

const existeCorreo = async (nombreColeccion, correo) => {
  const correoNormalizado = String(correo).trim().toLowerCase()
  const snapshot = await getDocs(collection(db, nombreColeccion))
  return snapshot.docs.some((docItem) => String(docItem.data()?.correo || '').trim().toLowerCase() === correoNormalizado)
}

export const validarAccesoCorreoContrasena = async (correo) => {
  // aqui maestro yo permito solo staff por correo y contrasena
  const rolDetectado = inferirRolPorCorreo(correo)
  if (!rolDetectado) return { permitido: false, mensaje: 'Cuenta invalida' }
  if (rolDetectado === 'cliente') return { permitido: false, mensaje: 'Clientes deben usar acceso con Google' }
  if (rolDetectado === 'administrador') return { permitido: true, mensaje: '' }
  const coleccion = rolDetectado === 'repartidor' ? 'repartidores' : 'empleados'
  const existeStaff = await existeCorreo(coleccion, correo)
  if (existeStaff) return { permitido: true, mensaje: '' }
  return { permitido: false, mensaje: 'Cuenta invalida' }
}