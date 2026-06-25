import { TarjetaBase } from '../../../components/tarjeta_base'

// aqui maestro exporte el componente para mostrar la eficiencia
export function SeccionEficiencia() {
  return (
    // aqui puse profe la tarjeta base para envolver la informacion de produccion
    <TarjetaBase className="flex flex-col justify-between min-h-[200px]">
      // esto sirve para el titulo de la seccion y el indicador en vivo
      <h3 className="text-secundario font-medium mb-4 flex items-center justify-between">
        Eficiencia de Producción
        <span className="bg-secundario/20 text-secundario text-xs px-2 py-1">LIVE</span>
      </h3>
      // aqui maestro funciona asi el despliegue del porcentaje de eficiencia
      <div className="flex flex-col items-center justify-center flex-1">
        <span className="text-6xl font-black text-texto mb-2">--%</span>
        // yo utilice esta etiqueta para mostrar la varianza optima
        <span className="text-mutado text-sm">Varianza Óptima: --</span>
      </div>
    </TarjetaBase>
  )
}