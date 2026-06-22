import { Boton } from '../../../components/boton'

// aqui maestro exporte el componente hero para mostrar el encabezado principal
export function SeccionHero() {
  return (
    // aqui puse profe el contenedor con el fondo oscuro y centrado
    <div className="relative border-b border-borde flex flex-col items-center justify-center text-center py-32 px-4 overflow-hidden bg-fondo">
      <div className="absolute inset-0 bg-gradient-to-b from-primario/5 to-fondo opacity-80"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        // esto sirve para la etiqueta informativa superior
        <span className="inline-block bg-primario/10 text-primario border border-primario/30 px-4 py-1 text-xs font-bold tracking-widest mb-6">
          FABRICACIÓN NACIONAL
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-texto mb-6 tracking-tight">
          Hardware puro para <br /> máximo rendimiento
        </h1>
        // aqui maestro puse la descripcion de la empresa
        <p className="text-mutado text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Diseño, ensamblaje y distribución de tarjetas gráficas, procesadores y componentes de grado entusiasta. Abastecemos a las mejores tiendas de todo México.
        </p>
        // maestro funciona asi los botones de accion
        <div className="flex gap-4 justify-center">
          <Boton variante="primario">
            VER COMPONENTES
          </Boton>
          <Boton variante="contorno">
            NUESTRA FÁBRICA
          </Boton>
        </div>
      </div>
    </div>
  )
}