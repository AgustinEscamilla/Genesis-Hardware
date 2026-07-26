// maestro funciona asi yo tabulo la eficacia de cada repartidor segun sus entregas
export function TablaEficaciaRepartidores({ repartidores }) {
    return (
        <table className="w-full text-xs text-left">
            <thead>
                <tr className="text-mutado uppercase tracking-widest border-b border-borde">
                    <th className="py-2">Repartidor</th>
                    <th className="py-2">Entregados</th>
                    <th className="py-2">Rechazados</th>
                    <th className="py-2">Tasa de exito</th>
                </tr>
            </thead>
            <tbody>
                {repartidores.map((r) => (
                    <tr key={r.repartidorId} className="border-b border-borde/50">
                        <td className="py-2 text-texto">{r.repartidorId.slice(0, 8)}</td>
                        <td className="py-2 text-emerald-400">{r.entregados}</td>
                        <td className="py-2 text-primario">{r.rechazados}</td>
                        <td className="py-2 text-terciario">{(r.tasaExito * 100).toFixed(0)}%</td>
                    </tr>
                ))}
                {!repartidores.length && <tr><td colSpan={4} className="py-3 text-mutado">Sin datos todavia</td></tr>}
            </tbody>
        </table>
    )
}
