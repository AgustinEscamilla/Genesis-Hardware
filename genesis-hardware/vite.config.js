import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// aqui maestro yo defino el puerto local de vite
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
  },
})
