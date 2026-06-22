import { TarjetaModulo } from '../../../components/tarjeta_modulo'

// esto sirve para desplegar todas las tarjetas de mis productos
export function SeccionModulos() {
  return (
    <div className="py-20 px-8 max-w-7xl mx-auto bg-fondo">
      // aqui puse profe el encabezado con el titulo y el estado del stock
      <div className="flex justify-between items-end mb-10 border-b border-borde pb-4">
        <div>
          <h2 className="text-2xl font-bold text-texto flex items-center gap-2">Líneas de Producto</h2>
          <p className="text-mutado text-sm mt-2">Fabricación de piezas clave para armados extremos y gaming.</p>
        </div>
        <div className="text-xs text-mutado bg-panel px-3 py-2 border border-borde">
          Stock: Actualizado
        </div>
      </div>
      // yo utilice este componente para organizar mis productos en tres columnas
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TarjetaModulo 
          titulo="Tarjetas Gráficas" 
          descripcion="Arquitectura de última generación con refrigeración de triple ventilador y disipadores de cobre puro." 
          metrica="Frecuencia Turbo" 
          valor="2.5 GHz+" 
          etiqueta="GPU" 
        />
        // maestro funciona asi la tarjeta de procesadores
        <TarjetaModulo 
          titulo="Procesadores y RAM" 
          descripcion="CPUs de múltiples núcleos y memorias RAM DDR5 de ultra baja latencia para un multitasking perfecto." 
          metrica="Frecuencia Base" 
          valor="6000 MHz" 
          etiqueta="CPU/RAM" 
        />
        // aqui maestro puse la ultima tarjeta de enfriamiento
        <TarjetaModulo 
          titulo="Sistemas de Enfriamiento" 
          descripcion="Ventiladores de levitación magnética y sistemas de refrigeración líquida para temperaturas críticas." 
          metrica="Flujo de Aire" 
          valor="85 CFM" 
          etiqueta="COOLING" 
        />
      </div>
    </div>
  )
}