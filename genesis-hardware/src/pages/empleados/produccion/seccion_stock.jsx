import { TarjetaBase } from '../../../components/tarjeta_base'

// aqui maestro exporte el componente para monitorear el stock que esta en niveles criticos
export function SeccionStock() {
  return (
    // aqui puse profe la tarjeta base con el borde resaltado para el stock critico
    <TarjetaBase className="border-primario/50">
      // esto sirve para indicar visualmente que hay un problema de inventario
      <h3 className="text-primario font-medium mb-4">⚠️ Stock Crítico</h3>
      // yo utilice este contenedor para mostrar el estado cuando no hay registros
      <div className="flex flex-col items-center justify-center py-4 flex-1">
        <p className="text-mutado text-sm tracking-wide">Sin datos registrados</p>
      </div>
    </TarjetaBase>
  )
}