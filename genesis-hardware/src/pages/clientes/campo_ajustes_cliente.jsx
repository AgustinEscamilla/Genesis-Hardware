// aqui puse profe un campo generico para no repetir los inputs del formulario
export function CampoAjustesCliente({ etiqueta, tipo, valor, alCambiar, autoCompletar, requerido = false, patron, maxLongitud, placeholder, ayuda }) {
  return (
    <label className="block text-xs font-medium text-texto/80">
      {etiqueta}
      <input
        type={tipo}
        value={valor}
        onChange={(e) => alCambiar(e.target.value)}
        placeholder={placeholder || etiqueta}
        className="mt-2 w-full rounded border border-borde bg-fondo px-3 py-2 text-sm text-texto shadow-sm focus:border-primario focus:outline-none"
        autoComplete={autoCompletar}
        required={requerido}
        pattern={patron}
        maxLength={maxLongitud}
      />
      {ayuda && <span className="mt-1 block text-[10px] text-mutado">{ayuda}</span>}
    </label>
  )
}
