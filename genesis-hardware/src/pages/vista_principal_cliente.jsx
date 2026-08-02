// aqui maestro yo documente este archivo para mantener trazabilidad
import { useCarritoPedidos } from '../hooks/use_carrito_pedidos'
import { useAutenticacion } from '../hooks/use_autenticacion'
import { useSeguimientoPedidos } from '../hooks/use_seguimiento_pedidos'
import { use_modal_carrito } from '../hooks/use_modal_carrito'
import { useCatalogoFirstpc } from '../hooks/use_catalogo_firstpc'
import { CabeceraFirstpc } from '../components/cabecera_firstpc'
import { SeccionCatalogoClienteFirstpc } from './seccion_catalogo_cliente_firstpc'
import { BotonSalida } from '../components/boton_salida'
import { ClientePanelSeguimiento } from './cliente_panel_seguimiento'
import { ClienteModalCarrito } from './cliente_modal_carrito'

export function VistaPrincipalCliente() {
  const { usuarioActual } = useAutenticacion()
  const carrito = useCarritoPedidos('cliente')
  const modal_carrito = use_modal_carrito()
  const catalogo = useCatalogoFirstpc()
  const { pedidos } = useSeguimientoPedidos(usuarioActual?.uid)

  return (
    <div className="min-h-screen bg-fondo text-texto flex flex-col">
      <CabeceraFirstpc autenticado carrito={carrito.carrito.reduce((total, item) => total + item.cantidad, 0)} al_buscar={() => document.querySelector('input[placeholder^="Procesadores"]')?.focus()} al_abrir_carrito={modal_carrito.alternar} acciones_extra={<BotonSalida />} />
      <SeccionCatalogoClienteFirstpc catalogo={catalogo} al_agregar={carrito.agregar} />
      <div className="mx-auto w-full max-w-7xl px-4">
        <ClientePanelSeguimiento pedidos={pedidos} />
      </div>
      <ClienteModalCarrito modal_carrito={modal_carrito} carrito={carrito} />
    </div>
  )
}
