export function TarjetaBase({ children, className = '' }) {
  return (
    <div className={`bg-panel border border-borde p-6 ${className}`}>
      {children}
    </div>
  )
}