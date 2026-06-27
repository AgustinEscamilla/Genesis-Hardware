export function TablaGenerica({ encabezados, children }) {
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
          {children}
        </tbody>
      </table>
    </div>
  )
}