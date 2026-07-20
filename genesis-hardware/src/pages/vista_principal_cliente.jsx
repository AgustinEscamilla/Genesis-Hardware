// aqui maestro yo documente este archivo para mantener trazabilidad
import { useCatalogoPublico } from '../hooks/use_catalogo_publico'
import { useCarritoPedidos } from '../hooks/use_carrito_pedidos'
import { useAutenticacion } from '../hooks/use_autenticacion'
import { useNotificaciones } from '../hooks/use_notificaciones'
import { useSeguimientoPedidos } from '../hooks/use_seguimiento_pedidos'
import { ClienteBarraCatalogo } from './cliente_barra_catalogo'
import { ClienteFiltrosCatalogo } from './cliente_filtros_catalogo'
import { ClienteGrillaCatalogo } from './cliente_grilla_catalogo'
import { ClientePanelSeguimiento } from './cliente_panel_seguimiento'

export function VistaPrincipalCliente() {
  const { usuarioActual } = useAutenticacion()
  const { productos, cargando } = useCatalogoPublico()
  const { carrito, agregar, confirmar, zonaLogistica, setZonaLogistica } = useCarritoPedidos('cliente')
  const { notificaciones, marcarLeida } = useNotificaciones(usuarioActual?.uid)
  const { pedidos } = useSeguimientoPedidos(usuarioActual?.uid)

  return (
    <div className="min-h-screen bg-fondo text-texto flex flex-col">
      <ClienteBarraCatalogo
        alConfirmar={confirmar}
        total={carrito.length}
        zonaLogistica={zonaLogistica}
        alCambiarZona={setZonaLogistica}
        notificaciones={notificaciones}
        alMarcarLeida={marcarLeida}
      />
      <div className="bg-panel border border-borde p-6 m-4 rounded-lg">
        <h1 className="text-2xl font-bold text-texto">Bienvenido a Genesis Hardware</h1>
        <p className="text-xs text-mutado mt-2">Explora nuestro catalogo y confirma tu pedido seguro.</p>
      </div>
      <div className="flex-1 p-4 flex gap-4">
        <ClienteFiltrosCatalogo />
        <ClienteGrillaCatalogo productos={productos} cargando={cargando} alAgregar={agregar} />
      </div>
      <ClientePanelSeguimiento pedidos={pedidos} />
    </div>
  )
}