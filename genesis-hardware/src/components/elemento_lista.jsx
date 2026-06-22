// pos esto funciona para poner el texto a la izquierda y los numeros a la derecha sin hacer tanto revoltijo
export function ElementoLista({ izquierda, derecha, borde = true }) {
  return (
    <div className={`flex justify-between items-center py-2 ${borde ? 'border-b border-borde' : ''}`}>
      {izquierda}
      {derecha}
    </div>
  )
}