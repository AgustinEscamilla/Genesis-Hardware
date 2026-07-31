import { useRedireccionAuth } from '../hooks/use_redireccion_auth'
import { FormularioAcceso } from '../pages/formulario_acceso'
import { BotonGoogle } from './boton_google'

// maestro funciona asi yo muestro el inicio de sesion como modal arriba del menu principal
export function ModalAutenticacion({ abierto, al_cerrar }) {
    const { cargando } = useRedireccionAuth()

    if (!abierto) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-borde bg-panel p-8 shadow-vidrio">
                <div className="absolute inset-x-0 top-0 h-px bg-degradado-marca"></div>
                <div className="mb-6 flex items-center justify-between">
                    <p className="text-sm font-black uppercase tracking-widest texto-degradado">Iniciar sesion</p>
                    <button onClick={al_cerrar} className="text-xs text-mutado hover:text-texto">Cerrar</button>
                </div>
                {cargando ? (
                    <p className="text-xs text-mutado">Cargando acceso</p>
                ) : (
                    <>
                        <FormularioAcceso />
                        <div className="mt-6 border-t border-borde pt-4"><BotonGoogle /></div>
                    </>
                )}
            </div>
        </div>
    )
}
