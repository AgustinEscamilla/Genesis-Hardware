import { Link } from 'react-router-dom'

// aqui maestro yo muestro el dashboard inicial del repartidor con los valores de la empresa
export function VistaPrincipalRepartidor() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-borde bg-panel p-6 shadow-vidrio">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-primario">Operacion en calle</p>
        <h2 className="text-3xl font-black texto-degradado">Panel de reparto</h2>
        <p className="mt-2 max-w-2xl text-sm text-mutado">Consulta tus pedidos genera una ruta y registra cada entrega desde este espacio</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Link to="asignados" className="rounded-lg border border-borde border-l-4 border-l-primario bg-panel p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primario"><p className="text-xs font-bold uppercase tracking-widest text-primario">01 Preparar</p><p className="mt-2 text-sm font-bold">Pedidos asignados</p><p className="mt-1 text-xs text-mutado">Revisa las zonas listas para salir</p></Link>
        <Link to="rutas" className="rounded-lg border border-borde border-l-4 border-l-terciario bg-panel p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-terciario"><p className="text-xs font-bold uppercase tracking-widest text-terciario">02 Conducir</p><p className="mt-2 text-sm font-bold">Ruta de entrega</p><p className="mt-1 text-xs text-mutado">Organiza y comienza tu recorrido</p></Link>
        <Link to="reporte-fallas" className="rounded-lg border border-borde border-l-4 border-l-vino bg-panel p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-vino"><p className="text-xs font-bold uppercase tracking-widest text-vino">03 Reportar</p><p className="mt-2 text-sm font-bold">Incidencias</p><p className="mt-1 text-xs text-mutado">Registra cualquier problema del vehiculo</p></Link>
      </div>
    </div>
  )
}
