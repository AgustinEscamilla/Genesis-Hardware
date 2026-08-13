// aqui maestro yo documente este archivo para mantener trazabilidad
export function Boton({ children, variante = 'primario', className = '', ...props }) {
  const estilosBase = "font-bold px-8 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primario focus:ring-offset-2 focus:ring-offset-fondo disabled:cursor-not-allowed disabled:opacity-50"

  const estilosVariante = {
    primario: "bg-degradado-primario text-fondo shadow-brillo-primario hover:-translate-y-0.5 hover:brightness-110",
    contorno: "bg-panel/60 backdrop-blur border border-borde text-texto hover:border-primario/60 hover:-translate-y-0.5"
  }

  return (
    <button
      className={`${estilosBase} ${estilosVariante[variante]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
