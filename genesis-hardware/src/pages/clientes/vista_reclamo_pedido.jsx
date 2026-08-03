import { Link, useSearchParams } from 'react-router-dom'
import { useAutenticacion } from '../../hooks/use_autenticacion'
import { useFormularioReclamo } from '../../hooks/use_formulario_reclamo'
import { useReclamosCliente } from '../../hooks/use_reclamos_cliente'
import { FormularioReclamo } from './formulario_reclamo'
import { ListaReclamosCliente } from './lista_reclamos_cliente'
import { CabeceraFirstpc } from '../../components/cabecera_firstpc'
import { BotonSalida } from '../../components/boton_salida'

// esto sirve para que el cliente levante un reclamo del pedido que selecciono
export function VistaReclamoPedido() {
    const [parametros] = useSearchParams()
    const pedidoId = parametros.get('pedido')
    const { usuarioActual } = useAutenticacion()
    const clienteId = usuarioActual?.uid
    const formulario = useFormularioReclamo(pedidoId, clienteId)
    const { reclamos } = useReclamosCliente(clienteId)

    return (
        <div className="min-h-screen bg-fondo text-texto">
            <CabeceraFirstpc autenticado mostrar_carrito={false} acciones_extra={<BotonSalida />} />
            <main className="mx-auto flex max-w-2xl flex-col gap-4 p-6">
            {!pedidoId && <div className="border border-borde bg-panel p-4 text-xs text-mutado">Selecciona un pedido desde <Link to="/clientes/pedidos" className="text-primario underline">Pedidos</Link> para levantar un reporte</div>}
            <p className="text-xs text-mutado">Pedido seleccionado {pedidoId ? pedidoId.slice(0, 8) : 'sin seleccionar'}</p>
            <FormularioReclamo {...formulario} />
            <ListaReclamosCliente reclamos={reclamos} />
            </main>
        </div>
    )
}
