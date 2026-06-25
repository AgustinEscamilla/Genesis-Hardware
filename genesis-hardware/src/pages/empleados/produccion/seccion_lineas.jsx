import { TarjetaBase } from '../../../components/tarjeta_base'

// aqui maestro exporte el componente para visualizar las lineas activas de fabricacion
export function SeccionLineas() {
  return (
    // aqui puse profe la tarjeta base para mostrar el estado de las lineas
    <TarjetaBase>
      <h3 className="text-terciario font-medium mb-4">Líneas Activas</h3>
      // yo utilice este contenedor para centrar el mensaje cuando no hay datos
      <div className="flex flex-col items-center justify-center py-4 flex-1">
        // esto sirve para indicar que actualmente no hay registros disponibles
        <p className="text-mutado text-sm tracking-wide">Sin datos registrados</p>
      </div>
    </TarjetaBase>
  )
}