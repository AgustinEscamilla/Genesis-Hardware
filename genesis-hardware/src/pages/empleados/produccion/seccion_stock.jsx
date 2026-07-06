import { TarjetaBase } from '../../../components/tarjeta_base'

export function SeccionStock() {
  return (
    <TarjetaBase className="border-primario/50">
      <h3 className="text-primario font-medium mb-4">⚠️ Stock Crítico</h3>
      <div className="flex flex-col items-center justify-center py-4 flex-1">
        <p className="text-mutado text-sm tracking-wide">Sin datos registrados</p>
      </div>
    </TarjetaBase>
  )
}