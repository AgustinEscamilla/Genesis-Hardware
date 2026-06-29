import { SeccionEmpleados } from './seccion_empleados'
import { SeccionInventario } from './seccion_inventario'
import { SeccionLogistica } from './seccion_logistica'

// aqui puse profe el armado final del panel usando los tres modulos
export function VistaPrincipalAdministrador() {

  // maestro funciona asi yo acomode todo en la cuadricula para que luzca profesional
  return (
    <div className="flex flex-col gap-6 w-full h-full p-8 bg-fondo min-h-screen">
      <div>
        <h2 className="text-3xl font-bold text-texto mb-1">Panel de Dirección</h2>
        <p className="text-mutado text-sm tracking-wide">VISIÓN GENERAL DE LA FÁBRICA</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SeccionInventario />
        </div>
        
        <div>
          <SeccionLogistica />
        </div>
        
        <div className="lg:col-span-3">
          <SeccionEmpleados />
        </div>
      </div>
    </div>
  )
}