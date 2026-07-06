import { TarjetaBase } from '../../../components/tarjeta_base'

export function SeccionLineas() {
  return (
    <TarjetaBase>
      <h3 className="text-terciario font-medium mb-4">Líneas Activas</h3>
      <div className="flex flex-col items-center justify-center py-4 flex-1">
        <p className="text-mutado text-sm tracking-wide">Sin datos registrados</p>
      </div>
    </TarjetaBase>
  )
}