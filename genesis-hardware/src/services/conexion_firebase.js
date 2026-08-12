import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getFunctions } from 'firebase/functions'

// aqui puse profe la configuracion para conectar la aplicacion con firebase usando el entorno local
const entorno = import.meta.env

export const configuracionFirebase = {
  apiKey: entorno.VITE_FIREBASE_API_KEY || entorno.API_KEY,
  authDomain: entorno.VITE_FIREBASE_AUTH_DOMAIN || entorno.AUTH_DOMAIN,
  projectId: entorno.VITE_FIREBASE_PROJECT_ID || entorno.PROJECT_ID,
  storageBucket: entorno.VITE_FIREBASE_STORAGE_BUCKET || entorno.STORAGE_BUCKET,
  messagingSenderId: entorno.VITE_FIREBASE_MESSAGING_SENDER_ID || entorno.MESSAGING_SENDER_ID,
  appId: entorno.VITE_FIREBASE_APP_ID || entorno.APP_ID,
}

if (!configuracionFirebase.apiKey || !configuracionFirebase.authDomain || !configuracionFirebase.projectId || !configuracionFirebase.storageBucket || !configuracionFirebase.messagingSenderId || !configuracionFirebase.appId) {
  throw new Error('Faltan variables de entorno de Firebase')
}

const app = initializeApp(configuracionFirebase)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const funciones = getFunctions(app)
