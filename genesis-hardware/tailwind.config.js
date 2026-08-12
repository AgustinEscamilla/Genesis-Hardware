
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fondo: 'rgb(var(--color-fondo) / <alpha-value>)',
        panel: 'rgb(var(--color-panel) / <alpha-value>)',
        borde: 'rgb(var(--color-borde) / <alpha-value>)',
        primario: '#ff4c4c',
        secundario: '#8b5cf6',
        terciario: '#06b6d4',
        vino: '#722F37',
        texto: 'rgb(var(--color-texto) / <alpha-value>)',
        mutado: 'rgb(var(--color-mutado) / <alpha-value>)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'degradado-marca': 'linear-gradient(135deg, #ff4c4c 0%, #8b5cf6 55%, #06b6d4 100%)',
        'degradado-primario': 'linear-gradient(135deg, #ff4c4c 0%, #ff8264 100%)',
        'degradado-vino': 'linear-gradient(135deg, #722F37 0%, #ff4c4c 100%)',
        'degradado-oscuro': 'linear-gradient(180deg, rgba(20,20,20,0.9) 0%, rgba(10,10,10,0.95) 100%)'
      },
      boxShadow: {
        'brillo-primario': '0 0 0 1px rgba(255,76,76,0.35), 0 8px 30px -8px rgba(255,76,76,0.45)',
        'brillo-secundario': '0 0 0 1px rgba(139,92,246,0.35), 0 8px 30px -8px rgba(139,92,246,0.4)',
        'brillo-vino': '0 0 0 1px rgba(114,47,55,0.45), 0 8px 30px -8px rgba(114,47,55,0.55)',
        'vidrio': '0 8px 32px -10px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.05)'
      },
      keyframes: {
        flotar: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(18px, -24px) scale(1.06)' }
        }
      },
      animation: {
        flotar: 'flotar 12s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}