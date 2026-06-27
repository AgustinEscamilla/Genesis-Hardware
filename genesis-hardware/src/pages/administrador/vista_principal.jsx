// aqui maestro yo cree el contenedor principal del administrador para que todo quede ordenado
export function VistaPrincipalAdministrador() {
  
  // maestro funciona asi yo puse una cuadricula con tailwind para acomodar las piezas que haremos despues
  return (
    <div className="flex flex-col gap-6 w-full h-full p-8 bg-fondo min-h-screen">
      <div>
        <h2 className="text-3xl font-bold text-texto mb-1">Panel de Dirección</h2>
        <p className="text-mutado text-sm tracking-wide">VISION GENERAL DE LA FABRICA</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-panel border border-borde p-6 h-64 flex items-center justify-center">
          <p className="text-mutado">inventario</p>
        </div>
        
        <div className="bg-panel border border-borde p-6 h-64 flex items-center justify-center">
          <p className="text-mutado">envios</p>
        </div>
        
        <div className="lg:col-span-3 bg-panel border border-borde p-6 h-64 flex items-center justify-center">
          <p className="text-mutado"> tabla de empleados</p>
        </div>
      </div>
    </div>
  )
}