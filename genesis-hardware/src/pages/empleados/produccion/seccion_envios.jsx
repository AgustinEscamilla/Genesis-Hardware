import { TarjetaBase } from '../../../components/tarjeta_base'

// aqui maestro exporte el componente para gestionar la cola de envios 
export function SeccionEnvios() {
  return (
    // aqui puse profe la tarjeta base para organizar mis envios
    <TarjetaBase>
      <h3 className="text-texto font-medium mb-4">Cola de Envíos y RMA</h3>
      // yo utilice esta cuadricula para mostrar las ordenes y pendientes
      <div className="grid grid-cols-2 gap-4">
        // esto sirve para visualizar el total de ordenes de salida
        <div className="p-4 border border-borde flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-texto mb-1">--</span>
          <span className="text-mutado text-sm text-center">Órdenes de Salida</span>
        </div>
        // aqui maestro puse el contador de rma pendientes
        <div className="p-4 border border-borde flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-primario mb-1">--</span>
          <span className="text-mutado text-sm text-center">RMA Pendientes</span>
        </div>
      </div>
    </TarjetaBase>
  )
}