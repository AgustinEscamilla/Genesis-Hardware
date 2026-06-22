import { SeccionEficiencia } from './seccion_eficiencia'
import { SeccionStock } from './seccion_stock'
import { SeccionLineas } from './seccion_lineas'
import { SeccionEnvios } from './seccion_envios'

// esto sirve para juntar todas las piezas del rompecabezas y armar la vista completa sin amontonar codigo
export function VistaPrincipal() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-3xl font-bold text-texto mb-1">Portal de Empleados</h2>
        <p className="text-mutado text-sm tracking-wide">GESTIÓN CENTRAL OVERVIEW</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SeccionEficiencia />
        </div>
        <SeccionStock />
        <SeccionLineas />
        <div className="lg:col-span-2">
          <SeccionEnvios />
        </div>
      </div>
    </div>
  )
}