import { Children } from 'react'

export function TablaGenerica({ encabezados, children, mensajeVacio = 'Datos faltantes por ahora' }) {
  const tieneFilas = Children.count(children) > 0

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-borde text-mutado text-sm">
            {encabezados.map((titulo, indice) => (
              <th key={indice} className="py-3 px-4 font-semibold">
                {titulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tieneFilas ? (
            children
          ) : (
            <tr className="border-b border-borde/50">
              <td colSpan={encabezados.length} className="py-4 px-4 text-sm text-mutado italic">
                {mensajeVacio}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}