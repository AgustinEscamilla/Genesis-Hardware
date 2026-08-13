// maestro funciona asi yo prepare esta pieza para los botones de accion
export function BotonPrincipal({ texto, alHacerClic, tipo = "button" }) {
  return (
    // aqui maestro yo utilice la etiqueta del boton con los colores del sistema
    <button
      type={tipo}
      onClick={alHacerClic}
      className="w-full rounded-lg bg-degradado-primario px-4 py-2.5 font-bold text-fondo shadow-brillo-primario transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
    >
      {texto}
    </button>
  )
}