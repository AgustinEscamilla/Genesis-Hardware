import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC3oc0s8lagqgwMw0tJ_gs25Hp2n_XnywQ",
  authDomain: "genesis-hardware.firebaseapp.com",
  projectId: "genesis-hardware",
  storageBucket: "genesis-hardware.firebasestorage.app",
  messagingSenderId: "709621011161",
  appId: "1:709621011161:web:67da28a8efcbcddb4aa4c8"
}

export const aplicacion = initializeApp(firebaseConfig)
export const baseDeDatos = getFirestore(aplicacion)