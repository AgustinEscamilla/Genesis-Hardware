import { TablaGenerica } from '../../components/tabla_generica'

// aqui puse profe la seccion de logistica para ver los estados de envio
export function SeccionLogistica() {
  const envios = [
    { id: 1, destino: 'Ciudad de México', estado: 'En Camino' },
    { id: 2, destino: 'Guadalajara', estado: 'Entregado' }
  ]

  const titulos = ['Destino', 'Estatus']

  // maestro funciona asi yo mando la lista de envios a la tabla generica
  return (
    <div className="bg-panel border border-borde p-6 shadow-sm flex flex-col gap-4">
      <h3 className="text-xl font-bold text-texto">Monitoreo de Envíos</h3>
      <TablaGenerica encabezados={titulos}>
        {envios.map((envio) => (
          <tr key={envio.id} className="border-b border-borde/50">
            <td className="py-3 px-4 text-texto">{envio.destino}</td>
            <td className="py-3 px-4 text-mutado">{envio.estado}</td>
          </tr>
        ))}
      </TablaGenerica>
    </div>
  )
}