import { TablaGenerica } from '../../components/tabla_generica'

// aqui maestro yo hice esta seccion para ver los envios de la empresa de paqueteria externa
export function SeccionLogistica() {
  const envios = []
  const titulos = ['Destino', 'Estatus']

  // esto sirve para pasar los datos de logistica al componente hijo
  return (
    <div className="bg-panel border border-borde p-6 shadow-sm flex flex-col gap-4">
      <h3 className="text-xl font-bold text-texto">Monitoreo de Envíos</h3>
      <TablaGenerica encabezados={titulos} mensajeVacio="Datos faltantes por ahora">
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