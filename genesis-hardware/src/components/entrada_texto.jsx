// aqui maestro yo documente este archivo para mantener trazabilidad
export function EntradaTexto({ id, tipo, etiqueta, valor, alCambiar }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold text-texto">
        {etiqueta}
      </label>
      <input
        id={id}
        type={tipo}
        value={valor}
        onChange={alCambiar}
        className="w-full rounded-lg bg-fondo/60 border border-borde text-texto px-3 py-2 transition-all duration-200 focus:outline-none focus:border-primario focus:ring-2 focus:ring-primario/30"
      />
    </div>
  )
}