import { TarjetaBase } from '../../../components/tarjeta_base'

export function SeccionEnvios() {
  return (
    <TarjetaBase>
      <h3 className="text-texto font-medium mb-4">Cola de Envíos y RMA</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border border-borde flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-texto mb-1">--</span>
          <span className="text-mutado text-sm text-center">Órdenes de Salida</span>
        </div>
        <div className="p-4 border border-borde flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-primario mb-1">--</span>
          <span className="text-mutado text-sm text-center">RMA Pendientes</span>
        </div>
      </div>
    </TarjetaBase>
  )
}