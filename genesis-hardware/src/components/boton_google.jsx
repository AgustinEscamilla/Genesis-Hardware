import { useAccesoGoogle } from '../hooks/use_acceso_google'

export function BotonGoogle() {
  const { cargando, mensajeError, accederConGoogle } = useAccesoGoogle()

  // maestro funciona asi yo uso el hook y pinto el estado del acceso
  return <div className="space-y-3"><button type="button" disabled={cargando} onClick={accederConGoogle} className="w-full rounded-md border border-borde bg-panel px-4 py-3 text-sm font-semibold text-texto transition hover:border-primario hover:text-primario dark:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60">{cargando ? 'Conectando con Google' : 'Acceder con Google'}</button>{mensajeError && <p className="text-sm text-primario">{mensajeError}</p>}</div>
}