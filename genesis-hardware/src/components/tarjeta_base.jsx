// aqui maestro yo arme este molde para las tarjetas y asi no repito el mismo fondo en todas partes
export function TarjetaBase({ children, className = '' }) {
  return (
    <div className={`bg-panel border border-borde p-6 ${className}`}>
      {children}
    </div>
  )
}