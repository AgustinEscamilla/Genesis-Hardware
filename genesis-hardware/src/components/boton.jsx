export function Boton({ children, variante = 'primario', className = '', ...props }) {
  const estilosBase = "font-bold px-8 py-3 transition-colors"
  
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