import { TablaGenerica } from '../../components/tabla_generica'

// aqui maestro yo arme el componente de empleados usando el nieto que creamos
export function SeccionEmpleados() {
  const lista = [
    { id: 1, nombre: 'Juan Perez', rol: 'Supervisor', correo: 'j.perez@genesis.com' },
    { id: 2, nombre: 'Ana Martinez', rol: 'Tecnico', correo: 'a.martinez@genesis.com' }
  ]

  const titulos = ['Nombre', 'Rol', 'Correo']

  // maestro funciona asi yo le paso los titulos y la lista de empleados al nieto para que los dibuje
  return (
    <div className="bg-panel border border-borde p-6 shadow-sm flex flex-col gap-4">
      <h3 className="text-xl font-bold text-texto">Plantilla Activa</h3>
      <TablaGenerica encabezados={titulos}>
        {lista.map((emp) => (
          <tr key={emp.id} className="border-b border-borde/50">
            <td className="py-3 px-4 text-texto">{emp.nombre}</td>
            <td className="py-3 px-4 text-mutado">{emp.rol}</td>
            <td className="py-3 px-4 text-mutado">{emp.correo}</td>
          </tr>
        ))}
      </TablaGenerica>
    </div>
  )
}