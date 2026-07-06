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
        className="w-full bg-fondo border border-borde text-texto px-3 py-2 focus:outline-none focus:border-primario"
      />
    </div>
  )
}