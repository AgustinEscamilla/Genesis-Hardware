import { useSearchParams } from 'react-router-dom'
import { useAutenticacion } from '../../hooks/use_autenticacion'
import { useFormularioReclamo } from '../../hooks/use_formulario_reclamo'
import { useReclamosCliente } from '../../hooks/use_reclamos_cliente'
import { FormularioReclamo } from './formulario_reclamo'
import { ListaReclamosCliente } from './lista_reclamos_cliente'

// esto sirve para que el cliente levante un reclamo del pedido que selecciono
export function VistaReclamoPedido() {
    const [parametros] = useSearchParams()
    const pedidoId = parametros.get('pedido')
    const { usuarioActual } = useAutenticacion()
    const clienteId = usuarioActual?.uid
    const formulario = useFormularioReclamo(pedidoId, clienteId)
    const { reclamos } = useReclamosCliente(clienteId)

    return (
        <div className="min-h-screen bg-fondo p-6 text-texto flex flex-col gap-4 max-w-2xl mx-auto">
            <p className="text-xs text-mutado">Pedido seleccionado {pedidoId ? pedidoId.slice(0, 8) : 'sin seleccionar'}</p>
            <FormularioReclamo {...formulario} />
            <ListaReclamosCliente reclamos={reclamos} />
        </div>
    )
}
