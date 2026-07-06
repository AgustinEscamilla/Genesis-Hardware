export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fondo: '#0a0a0a',
        panel: '#141414',
        borde: '#2d2d2d',
        primario: '#ff4c4c', 
        secundario: '#8b5cf6', 
        terciario: '#06b6d4',
        texto: '#f4f4f5',
        mutado: '#a1a1aa'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}