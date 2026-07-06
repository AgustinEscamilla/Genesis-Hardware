import { TarjetaBase } from '../../../components/tarjeta_base'

export function SeccionEficiencia() {
  return (
    <TarjetaBase className="flex flex-col justify-between min-h-[200px]">
      <h3 className="text-secundario font-medium mb-4 flex items-center justify-between">
        Eficiencia de Producción
        <span className="bg-secundario/20 text-secundario text-xs px-2 py-1">LIVE</span>
      </h3>
      <div className="flex flex-col items-center justify-center flex-1">
        <span className="text-6xl font-black text-texto mb-2">--%</span>
        <span className="text-mutado text-sm">Varianza Óptima: --</span>
      </div>
    </TarjetaBase>
  )
}