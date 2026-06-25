import { SeccionEficiencia } from './seccion_eficiencia'
import { SeccionStock } from './seccion_stock'
import { SeccionLineas } from './seccion_lineas'
import { SeccionEnvios } from './seccion_envios'

// esto sirve para juntar todas las cosas y armar la vista completa sin amontonar codigo
export function VistaPrincipal() {
  return (
    // aqui maestro puse el contenedor principal con el espaciado
    <div className="flex flex-col gap-6">
      // esto sirve para mostrar el titulo y la descripcion del portal
      <div>
        <h2 className="text-3xl font-bold text-texto mb-1">Portal de Empleados</h2>
        <p className="text-mutado text-sm tracking-wide">GESTIÓN CENTRAL OVERVIEW</p>
      </div>
      // yo utilice esta cuadricula para organizar las secciones de produccion
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SeccionEficiencia />
        </div>
        // aqui maestro puse las secciones de stock y lineas
        <SeccionStock />
        <SeccionLineas />
        <div className="lg:col-span-2">
          <SeccionEnvios />
        </div>
      </div>
    </div>
  )
}