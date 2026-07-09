import { useCerrarSesion } from '../../hooks/use_cerrar_sesion'

// aqui maestro yo muestro el panel del repartidor con la paleta dark del proyecto y cierre de sesion
export function VistaPrincipalRepartidor() {
  const { salir } = useCerrarSesion()

  return (
    <div className="min-h-screen bg-fondo flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl border border-borde bg-panel p-10 flex flex-col gap-6 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-primario">Portal repartidor</p>
        <h1 className="text-3xl font-black text-texto">Panel de repartidor</h1>
        <p className="text-sm text-mutado">Vista base lista para rutas entregas y seguimiento logistico</p>
        <button
          onClick={salir}
          className="mt-4 self-center border border-borde text-texto text-xs px-6 py-2 hover:bg-red-700 hover:border-red-700 transition-colors"
        >
          Cerrar sesion
        </button>
      </div>
    </div>
  )
}