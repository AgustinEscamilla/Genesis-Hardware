// aqui maestro yo documente este archivo para mantener trazabilidad
export function AlertaStockAdmin({ alertas }) {
  if (!alertas.length) return null

  return (
    <div className="flex flex-col gap-2 border border-primario/40 bg-primario/10 p-4">
      <p className="text-xs font-bold uppercase tracking-widest text-primario">Atencion requerida</p>
      <p className="text-xs text-mutado">Hay componentes por debajo del minimo configurado</p>
      {alertas.map(a => (
        <p key={a.id} className="text-xs text-texto">
          {a.nombreProducto} en minimo {a.volumen} de {a.stockMinimo}
        </p>
      ))}
    </div>
  )
}
