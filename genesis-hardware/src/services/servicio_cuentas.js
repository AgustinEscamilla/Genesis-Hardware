// aqui maestro yo documente este archivo para mantener trazabilidad
import { createUserWithEmailAndPassword, getAuth, signOut } from 'firebase/auth'
import { initializeApp, getApp, getApps } from 'firebase/app'
import { collection, doc, getDoc, onSnapshot, serverTimestamp, writeBatch } from 'firebase/firestore'
import { configuracionFirebase, db } from './conexion_firebase'

const colecciones = { empleado: 'empleados', repartidor: 'repartidores' }

const appSecundaria = getApps().some((app) => app.name === 'admin-cuentas') ? getApp('admin-cuentas') : initializeApp(configuracionFirebase, 'admin-cuentas')
const authSecundaria = getAuth(appSecundaria)
const obtenerColeccion = (tipo) => colecciones[tipo] || colecciones.empleado
const obtenerReferencia = (tipo) => collection(db, obtenerColeccion(tipo))
const obtenerDocumento = (tipo, id) => doc(db, obtenerColeccion(tipo), id)
const obtenerRol = (tipo) => (tipo === 'repartidor' ? 'repartidor' : 'empleado')

export const escucharUsuariosPorTipo = (tipo, alCambiar, alError) => {
  return onSnapshot(obtenerReferencia(tipo), (snapshot) => {
    alCambiar(snapshot.docs.map((registro) => ({ id: registro.id, ...registro.data() })))
  }, alError)
}

export const crearCuentaUsuario = async ({ tipo, nombre, correo, contrasena }) => {
  const credencial = await createUserWithEmailAndPassword(authSecundaria, correo, contrasena)
  await signOut(authSecundaria).catch(() => {})
  const uidAuth = credencial.user.uid
  const batch = writeBatch(db)
  batch.set(doc(db, 'usuarios', uidAuth), { uidAuth, nombre, correo, rol: obtenerRol(tipo), origen: tipo, estado: 'Activo', actualizadoEn: serverTimestamp() }, { merge: true })
  batch.set(doc(obtenerReferencia(tipo)), { nombre, correo, rol: obtenerRol(tipo), estadoActivo: true, onboardingCompleto: false, tipo, uidAuth, creadoEn: serverTimestamp() })
  await batch.commit()
}

export const actualizarEstadoUsuario = async (tipo, id, estado) => {
  const estadoActivo = Boolean(estado)
  const referencia = obtenerDocumento(tipo, id)
  const registro = await getDoc(referencia)
  if (!registro.exists()) throw new Error('Cuenta no encontrada')
  const batch = writeBatch(db)
  batch.update(referencia, { estadoActivo, estado: estadoActivo ? 'Activo' : 'Inactivo' })
  if (registro.data().uidAuth) batch.set(doc(db, 'usuarios', registro.data().uidAuth), { estado: estadoActivo ? 'Activo' : 'Inactivo', actualizadoEn: serverTimestamp() }, { merge: true })
  await batch.commit()
}

export const eliminarUsuario = async (tipo, id) => {
  const referencia = obtenerDocumento(tipo, id)
  const registro = await getDoc(referencia)
  const batch = writeBatch(db)
  batch.delete(referencia)
  if (registro.exists() && registro.data().uidAuth) batch.delete(doc(db, 'usuarios', registro.data().uidAuth))
  await batch.commit()
}
