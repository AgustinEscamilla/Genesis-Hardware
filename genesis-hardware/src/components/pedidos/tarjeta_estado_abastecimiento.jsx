const tonos = {
  primario: 'border-primario/50 text-primario',
  terciario: 'border-terciario/50 text-terciario',
  secundario: 'border-secundario/50 text-secundario',
  mutado: 'border-borde text-mutado',
}

export function TarjetaEstadoAbastecimiento({ etiqueta, valor, descripcion, tono = 'mutado' }) {
  return (
    <article className={`border bg-panel p-4 ${tonos[tono] || tonos.mutado}`}>
      <p className="text-[10px] font-bold uppercase tracking-widest">{etiqueta}</p>
      <p className="mt-3 text-3xl font-black text-texto">{valor}</p>
      <p className="mt-2 text-xs text-mutado">{descripcion}</p>
    </article>
  )
}
