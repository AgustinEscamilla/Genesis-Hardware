// aqui maestro yo documente este archivo para mantener trazabilidad
export function TarjetaModulo({ titulo, descripcion, metrica, valor, etiqueta, imagen }) {
  return (
    <div className="bg-panel border border-borde p-6 flex flex-col h-full group hover:border-primario/50 transition-colors cursor-pointer">
      <div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-mutado text-xs bg-fondo px-2 py-1 border border-borde">{etiqueta}</span>
        </div>
        {imagen
          ? <img src={imagen} alt={titulo} className="w-full h-48 object-contain bg-fondo border border-borde mb-6" />
          : <div className="w-full h-48 bg-fondo border border-borde flex items-center justify-center text-primario mb-6"><span className="text-4xl">O</span></div>
        }

        <h3 className="text-xl font-bold text-texto mb-2 group-hover:text-primario transition-colors">{titulo}</h3>

        <p className="text-mutado text-sm leading-relaxed mb-6">{descripcion}</p>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-borde mt-auto">
        <span className="text-texto text-sm">{metrica}</span>
        <span className="text-texto font-bold tracking-wide">{valor}</span>
      </div>
    </div>
  )
}