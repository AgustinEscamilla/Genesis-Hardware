import { SeccionInventario } from './seccion_inventario'
import { SeccionLogistica } from './seccion_logistica'
import { TablaCuentasFirestore } from './tabla_cuentas_firestore'

// maestro funciona asi yo agrupo todas las tablas aqui para mantener el archivo padre limpio y modular
export function PanelTablasAdministrador() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2"><SeccionInventario /></div>
      <div><SeccionLogistica /></div>
      <div className="lg:col-span-3"><TablaCuentasFirestore tipo="empleado" titulo="Plantilla Activa" /></div>
      <div className="lg:col-span-3"><TablaCuentasFirestore tipo="repartidor" titulo="Cuentas de Repartidores" /></div>
    </div>
  )
}