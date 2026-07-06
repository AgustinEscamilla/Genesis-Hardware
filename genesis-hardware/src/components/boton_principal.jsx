// maestro funciona asi yo prepare esta pieza para los botones de accion
export function BotonPrincipal({ texto, alHacerClic, tipo = "button" }) {
  return (
    // aqui maestro yo utilice la etiqueta del boton con los colores del sistema
    <button
      type={tipo}
      onClick={alHacerClic}
      className="w-full bg-primario text-fondo font-bold py-2 px-4 hover:opacity-80 transition-opacity"
    >
      {texto}
    </button>
  )
}