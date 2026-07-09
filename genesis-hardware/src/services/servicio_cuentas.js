import { createUserWithEmailAndPassword, getAuth, signOut } from 'firebase/auth'
import { initializeApp, getApp, getApps } from 'firebase/app'
import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore'
import { configuracionFirebase, db } from './conexion_firebase'
import { guardarPerfilUsuario } from './servicio_usuarios'

const colecciones = { empleado: 'empleados', repartidor: 'repartidores' }

const appSecundaria = getApps().some((app) => app.name === 'admin-cuentas') ? getApp('admin-cuentas') : initializeApp(configuracionFirebase, 'admin-cuentas')
const authSecundaria = getAuth(appSecundaria)
const obtenerReferencia = (tipo) => collection(db, colecciones[tipo] || colecciones.empleado)
const obtenerRol = (tipo) => (tipo === 'repartidor' ? 'repartidor' : 'empleado')

export const escucharUsuariosPorTipo = (tipo, alCambiar) => {
  return onSnapshot(obtenerReferencia(tipo), (snapshot) => {
    alCambiar(snapshot.docs.map((registro) => ({ id: registro.id, ...registro.data() })))
  })
}

export const crearCuentaUsuario = async ({ tipo, nombre, correo, contrasena }) => {
  const referencia = obtenerReferencia(tipo)
  let uidAuth = 'uid-local-desarrollo'

  try {
    const credencial = await createUserWithEmailAndPassword(authSecundaria, correo, contrasena)
    await signOut(authSecundaria)
    uidAuth = credencial.user.uid
  } catch {
    console.warn('Fallo Auth usando UID local')
  }

  await guardarPerfilUsuario({ uidAuth, nombre, correo, rol: obtenerRol(tipo), origen: tipo })
  await addDoc(referencia, { nombre, correo, rol: obtenerRol(tipo), estadoActivo: true, onboardingCompleto: false, tipo, uidAuth, creadoEn: serverTimestamp() })
}

export const actualizarEstadoUsuario = async (tipo, id, estado) => {
  const estadoActivo = Boolean(estado)
  await updateDoc(doc(db, colecciones[tipo] || colecciones.empleado, id), { estadoActivo, estado: estadoActivo ? 'Activo' : 'Inactivo' })
}

export const eliminarUsuario = async (tipo, id) => {
  await deleteDoc(doc(db, colecciones[tipo] || colecciones.empleado, id))
}