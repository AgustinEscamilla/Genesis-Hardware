import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// aqui maestro yo defino el puerto local de vite
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          const ruta = id.replaceAll('\\', '/')
          if (ruta.includes('/node_modules/firebase/firestore')) return 'firebase_firestore'
          if (ruta.includes('/node_modules/firebase/auth')) return 'firebase_auth'
          if (ruta.includes('/node_modules/firebase/storage')) return 'firebase_storage'
          if (ruta.includes('/node_modules/firebase/app')) return 'firebase_app'
          if (ruta.includes('/node_modules/@firebase/')) return 'firebase_core'
          return undefined
        },
      },
    },
  },
})
