// aqui maestro yo documente este archivo para mantener trazabilidad
export function Boton({ children, variante = 'primario', className = '', ...props }) {
  const estilosBase = "font-bold px-8 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primario disabled:cursor-not-allowed disabled:opacity-50"
  
  const estilosVariante = {
    primario: "bg-primario text-fondo hover:bg-primario/80",
    contorno: "bg-transparent border border-borde text-texto hover:bg-panel"
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
