// aqui maestro yo muestro el dashboard inicial del repartidor con los valores de la empresa
export function VistaPrincipalRepartidor() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-panel border border-borde p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-1">Dashboard de reparto</h2>
        <p className="text-xs text-mutado">Aqui encuentras los principios operativos para cada ruta de entrega</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-borde border-l-4 border-l-primario bg-panel p-4 rounded-lg">
          <p className="text-xs uppercase tracking-widest text-primario mb-1">Seguridad</p>
          <p className="text-sm text-texto">El reparto comienza con un vehiculo seguro y revisado</p>
        </div>
        <div className="border border-borde border-l-4 border-l-terciario bg-panel p-4 rounded-lg">
          <p className="text-xs uppercase tracking-widest text-terciario mb-1">Puntualidad</p>
          <p className="text-sm text-texto">Siempre cumplir con la ruta planificada y mantener el control</p>
        </div>
        <div className="border border-borde border-l-4 border-l-secundario bg-panel p-4 rounded-lg">
          <p className="text-xs uppercase tracking-widest text-secundario mb-1">Calidad</p>
          <p className="text-sm text-texto">Entregar cada pedido completo y con informacion de cliente clara</p>
        </div>
      </div>
    </div>
  )
}
