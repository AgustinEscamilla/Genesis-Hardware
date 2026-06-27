import { TablaGenerica } from '../../components/tabla_generica'

// aqui puse profe la seccion de inventario aprovechando el nieto reutilizable
export function SeccionInventario() {
  const lista = [
    { id: 1, pieza: 'Tarjeta Madre X570', stock: 12 },
    { id: 2, pieza: 'Procesador Ryzen 7', stock: 45 },
    { id: 3, pieza: 'Memoria RAM 16GB', stock: 8 }
  ]

  const titulos = ['Componente', 'Cantidad en Stock']

  // esto sirve para mostrar la lista de piezas usando la misma tabla de antes
  return (
    <div className="bg-panel border border-borde p-6 shadow-sm flex flex-col gap-4">
      <h3 className="text-xl font-bold text-texto">Inventario de Componentes</h3>
      <TablaGenerica encabezados={titulos}>
        {lista.map((item) => (
          <tr key={item.id} className="border-b border-borde/50">
            <td className="py-3 px-4 text-texto">{item.pieza}</td>
            <td className="py-3 px-4 text-mutado">{item.stock} unidades</td>
          </tr>
        ))}
      </TablaGenerica>
    </div>
  )
}