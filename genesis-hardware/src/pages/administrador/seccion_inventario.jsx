import { TablaGenerica } from '../../components/tabla_generica'

// aqui puse profe la vista para que yo controle el inventario de las piezas de computadora
export function SeccionInventario() {
  const lista = []
  const titulos = ['Componente', 'Cantidad en Stock']

  // pos esto funciona mandando la lista a la tabla generica para no repetir codigo
  return (
    <div className="bg-panel border border-borde p-6 shadow-sm flex flex-col gap-4">
      <h3 className="text-xl font-bold text-texto">Inventario de Componentes</h3>
      <TablaGenerica encabezados={titulos} mensajeVacio="Datos faltantes por ahora">
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