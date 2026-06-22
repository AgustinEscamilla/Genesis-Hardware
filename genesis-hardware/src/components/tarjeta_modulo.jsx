// aqui puse profe el componente reutilizable para cada tarjeta de producto
export function TarjetaModulo({ titulo, descripcion, metrica, valor, etiqueta }) {
  return (
    <div className="bg-panel border border-borde p-6 flex flex-col justify-between h-full group hover:border-primario transition-colors cursor-default">
      <div>
        // aqui maestro funciona asi el encabezado de la tarjeta con el icono y la etiqueta
        <div className="flex justify-between items-center mb-4">
          <div className="w-10 h-10 bg-fondo border border-borde flex items-center justify-center text-primario">
            <span className="text-xl">⬡</span>
          </div>
          <span className="text-mutado text-xs bg-fondo px-2 py-1 border border-borde">{etiqueta}</span>
        </div>
        // yo utilice este titulo para mostrar el nombre del componente de hardware
        <h3 className="text-xl font-bold text-texto mb-2 group-hover:text-primario transition-colors">{titulo}</h3>
        // esto sirve para describir las especificaciones tecnicas del producto
        <p className="text-mutado text-sm leading-relaxed mb-6">{descripcion}</p>
      </div>
      // aqui maestro puse la seccion inferior con los valores de rendimiento
      <div className="flex justify-between items-center pt-4 border-t border-borde mt-auto">
        <span className="text-texto text-sm">{metrica}</span>
        <span className="text-texto font-bold tracking-wide">{valor}</span>
      </div>
    </div>
  )
}