// aqui maestro yo muestro el dashboard inicial del repartidor con los valores de la empresa
export function VistaPrincipalRepartidor() {
  return (
    <div className="min-h-screen bg-fondo text-texto">
      <div className="bg-panel border border-borde p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Dashboard de reparto</h2>
        <p className="text-xs text-mutado mb-4">Aqui encuentras los principios operativos para cada ruta de entrega</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-borde p-4 rounded-lg">
            <p className="text-xs uppercase text-mutado">Seguridad</p>
            <p className="text-sm text-texto">El reparto comienza con un vehiculo seguro y revisado</p>
          </div>
          <div className="border border-borde p-4 rounded-lg">
            <p className="text-xs uppercase text-mutado">Puntualidad</p>
            <p className="text-sm text-texto">Siempre cumplir con la ruta planificada y mantener el control</p>
          </div>
          <div className="border border-borde p-4 rounded-lg">
            <p className="text-xs uppercase text-mutado">Calidad</p>
            <p className="text-sm text-texto">Entregar cada pedido completo y con informacion de cliente clara</p>
          </div>
        </div>
      </div>
    </div>
  )
}
