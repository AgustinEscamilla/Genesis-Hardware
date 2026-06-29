import { createUserWithEmailAndPassword, getAuth, signOut } from 'firebase/auth'
import { initializeApp, getApp, getApps } from 'firebase/app'
import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore'
import { configuracionFirebase, db } from './conexion_firebase'

const colecciones = {
  empleado: 'empleados',
  repartidor: 'repartidores',
}

// aqui maestro yo armo una segunda instancia para que crear cuentas no tire la sesion del admin
const appSecundaria = getApps().some((app) => app.name === 'admin-cuentas')
  ? getApp('admin-cuentas')
  : initializeApp(configuracionFirebase, 'admin-cuentas')

const authSecundaria = getAuth(appSecundaria)

const obtenerReferencia = (tipo) => collection(db, colecciones[tipo] || colecciones.empleado)

export const escucharCuentas = (tipo, alCambiar) => {
  return onSnapshot(obtenerReferencia(tipo), (snapshot) => {
    const cuentas = snapshot.docs.map((registro) => ({
      id: registro.id,
      ...registro.data(),
    }))
    alCambiar(cuentas)
  })
}

// esto sirve para intentar registrar en auth y si falla aun asi lo guardamos en firestore
export const crearCuenta = async ({ tipo, nombre, correo, contrasena }) => {
  const referencia = obtenerReferencia(tipo)
  let uidAuth = 'uid-local-desarrollo'

  try {
    const credencial = await createUserWithEmailAndPassword(authSecundaria, correo, contrasena)
    await signOut(authSecundaria)
    uidAuth = credencial.user.uid
  } catch (error) {
    console.warn('Fallo Auth usando UID local')
  }

  await addDoc(referencia, {
    nombre,
    correo,
    rol: tipo === 'repartidor' ? 'Repartidor' : 'Empleado',
    estado: 'Activo',
    tipo,
    uidAuth,
    creadoEn: serverTimestamp(),
  })
}

export const actualizarEstadoCuenta = async (tipo, id, estado) => {
  await updateDoc(doc(db, colecciones[tipo] || colecciones.empleado, id), { estado })
}

export const eliminarCuenta = async (tipo, id) => {
  await deleteDoc(doc(db, colecciones[tipo] || colecciones.empleado, id))
}