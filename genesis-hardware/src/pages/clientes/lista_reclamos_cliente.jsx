import { TarjetaReclamo } from './tarjeta_reclamo'

// maestro funciona asi yo listo todos los reclamos que el cliente ha levantado
export function ListaReclamosCliente({ reclamos }) {
    return (
        <div className="border border-borde bg-panel rounded-lg p-4 flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-primario flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primario" />Mis reclamos</p>
            {!reclamos.length && <p className="text-xs text-mutado">Aun no has levantado ningun reclamo</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {reclamos.map((r) => <TarjetaReclamo key={r.id} reclamo={r} />)}
            </div>
        </div>
    )
}
