export function SelectorRepartidor({ repartidores, valor, al_cambiar }) {
    return <select value={valor} onChange={(evento) => al_cambiar(evento.target.value)} className="w-full rounded border border-borde bg-fondo px-3 py-2 text-xs text-texto">
        <option value="">Selecciona un repartidor</option>
        {repartidores.map((repartidor) => <option key={repartidor.id} value={repartidor.uidAuth || repartidor.id}>
            {repartidor.nombre || repartidor.correo || 'Repartidor sin nombre'}
        </option>)}
    </select>
}
