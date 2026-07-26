import { TarjetaModulo } from '../../../components/tarjeta_modulo'
import { useLineasPublico } from '../../../hooks/use_lineas_publico'

// esto sirve para desplegar las tarjetas de lineas de producto desde firestore
export function SeccionModulos() {
  const { lineas, cargando } = useLineasPublico()

  return (
    <div className="py-20 px-8 max-w-7xl mx-auto bg-fondo">
      {/* aqui puse profe el encabezado con el titulo y el estado del stock */}
      <div className="flex justify-between items-end mb-10 border-b border-borde pb-4">
        <div>
          <h2 className="text-2xl font-bold text-texto flex items-center gap-2">Tablero de informacion comercial</h2>
          <p className="text-mutado text-sm mt-2">Conoce mas sobre la empresa nuestras lineas disponibles y la propuesta comercial actual</p>
        </div>
        <div className="text-xs text-mutado bg-panel px-3 py-2 border border-borde">
          Stock: Actualizado
        </div>
      </div>
      {cargando && <p className="text-xs text-mutado">Cargando lineas...</p>}
      {/* esto sirve yo organizo las lineas de producto en tres columnas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lineas.map(l => (
          <TarjetaModulo
            key={l.id}
            titulo={l.titulo}
            descripcion={l.descripcion}
            metrica={l.metrica}
            valor={l.valor}
            etiqueta={l.etiqueta}
            imagen={l.imagen}
          />
        ))}
      </div>
    </div>
  )
}
