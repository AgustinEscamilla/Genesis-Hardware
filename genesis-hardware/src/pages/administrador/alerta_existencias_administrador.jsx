// aqui maestro yo documente este archivo para mantener trazabilidad
export function AlertaStockAdmin({ alertas }) {
  if (!alertas.length) return null

  return (
    <div className="border border-primario bg-primario/10 p-3 flex flex-col gap-1">
      <p className="text-xs uppercase tracking-widest text-primario">Alerta preventiva de stock</p>
      {alertas.map(a => (
        <p key={a.id} className="text-xs text-texto">
          {a.nombre} en minimo {a.volumen} de {a.stockMinimo}
        </p>
      ))}
    </div>
  )
}
