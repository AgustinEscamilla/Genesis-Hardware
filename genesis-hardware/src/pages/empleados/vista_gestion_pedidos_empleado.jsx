import { usePedidosClientes } from '../../hooks/use_pedidos_clientes'
import { useOperacionesDistribuidor } from '../../hooks/use_operaciones_distribuidor'
import { ListaRegistroPedidos } from './lista_registro_pedidos'

// aqui maestro yo muestro los pedidos con informacion del cliente para gestion
export function VistaGestionPedidosEmpleado() {
  const { pedidosConCliente } = usePedidosClientes()
  const { operaciones } = useOperacionesDistribuidor()
  const registros = [...pedidosConCliente, ...operaciones.map((operacion) => ({
    ...operacion, esAbastecimiento: true, zonaLogistica: 'Campeche', direccionEntrega: operacion.direccion,
    cliente: { nombre: 'Abastecimiento', correo: 'Solicitud de distribuidor' }
  }))]

  return (
    <div className="min-h-screen bg-fondo p-6 text-texto">
      <div className="bg-panel border border-borde p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-1">Registro de pedidos</h2>
        <p className="mb-4 text-xs text-mutado">Consulta el historial y estado de todos los pedidos sin modificar su flujo</p>
        <ListaRegistroPedidos registros={registros} />
      </div>
    </div>
  )
}
