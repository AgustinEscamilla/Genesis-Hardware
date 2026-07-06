import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// aqui puse profe la configuracion para conectar la aplicacion con firebase usando el entorno local
export const configuracionFirebase = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

if (!configuracionFirebase.apiKey || !configuracionFirebase.authDomain || !configuracionFirebase.projectId || !configuracionFirebase.storageBucket || !configuracionFirebase.messagingSenderId || !configuracionFirebase.appId) {
  throw new Error('Faltan variables de entorno de Firebase')
}

const app = initializeApp(configuracionFirebase)

export const auth = getAuth(app)
export const db = getFirestore(app)