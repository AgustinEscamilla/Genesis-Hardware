import { SeccionLogistica } from '../seccion_logistica'
import { TablaCuentasFirestore } from './tabla_cuentas_firestore'

// maestro funciona asi yo agrupo todas las tablas aqui para mantener el archivo padre limpio y modular
export function PanelTablasAdministrador() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div className="xl:col-span-3 min-w-0"><SeccionLogistica /></div>
      <div className="xl:col-span-3 min-w-0"><TablaCuentasFirestore tipo="empleado" titulo="Cuentas de Empleados" /></div>
      <div className="xl:col-span-3 min-w-0"><TablaCuentasFirestore tipo="repartidor" titulo="Cuentas de Repartidores" /></div>
    </div>
  )
}
