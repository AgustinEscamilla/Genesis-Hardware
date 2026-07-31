import { useAccesoGoogle } from '../hooks/use_acceso_google'

export function BotonGoogle() {
  const { cargando, mensajeError, accederConGoogle } = useAccesoGoogle()

  // maestro funciona asi yo uso el hook y pinto el estado del acceso
  return <div className="space-y-3"><button type="button" disabled={cargando} onClick={accederConGoogle} className="w-full rounded-lg border border-borde bg-panel/60 backdrop-blur px-4 py-3 text-sm font-semibold text-texto transition-all duration-200 hover:-translate-y-0.5 hover:border-primario/60 hover:text-primario disabled:cursor-not-allowed disabled:opacity-60">{cargando ? 'Conectando con Google' : 'Acceder con Google'}</button>{mensajeError && <p className="text-sm text-primario">{mensajeError}</p>}</div>
}