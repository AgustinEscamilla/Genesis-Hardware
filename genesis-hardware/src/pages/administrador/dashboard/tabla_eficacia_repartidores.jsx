// maestro funciona asi yo tabulo la eficacia de cada repartidor segun sus entregas
export function TablaEficaciaRepartidores({ repartidores }) {
    return (
        <div className="overflow-x-auto rounded-lg border border-borde"><table className="w-full min-w-[620px] text-left text-sm">
            <thead>
                <tr className="text-mutado uppercase tracking-widest border-b border-borde">
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-mutado">Repartidor</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-mutado">Entregados</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-mutado">Rechazados</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-mutado">Tasa de exito</th>
                </tr>
            </thead>
            <tbody>
                {repartidores.map((r) => (
                    <tr key={r.repartidorId} className="border-b border-borde/50">
                        <td className="px-4 py-3 font-semibold text-texto">{String(r.repartidorId).slice(0, 12)}</td>
                        <td className="px-4 py-3 text-emerald-400">{r.entregados}</td>
                        <td className="px-4 py-3 text-primario">{r.rechazados}</td>
                        <td className="px-4 py-3 font-bold text-terciario">{(r.tasaExito * 100).toFixed(0)}%</td>
                    </tr>
                ))}
                {!repartidores.length && <tr><td colSpan={4} className="px-4 py-8 text-center text-sm text-mutado">Aun no hay entregas o rechazos registrados</td></tr>}
            </tbody>
        </table></div>
    )
}
