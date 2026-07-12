// aqui maestro yo documente este archivo para mantener trazabilidad
import { useCatalogoPublico } from '../hooks/use_catalogo_publico'
import { useCarritoPedidos } from '../hooks/use_carrito_pedidos'
import { ClienteBarraCatalogo } from './cliente_barra_catalogo'
import { ClienteFiltrosCatalogo } from './cliente_filtros_catalogo'
import { ClienteGrillaCatalogo } from './cliente_grilla_catalogo'

export function VistaPrincipalCliente() {
  const { productos, cargando } = useCatalogoPublico()
  const { carrito, agregar, confirmar } = useCarritoPedidos('cliente')

  return (
    <div className="min-h-screen bg-fondo text-texto flex flex-col">
      <ClienteBarraCatalogo alConfirmar={confirmar} total={carrito.length} />
      <div className="flex-1 p-4 flex gap-4">
        <ClienteFiltrosCatalogo />
        <ClienteGrillaCatalogo productos={productos} cargando={cargando} alAgregar={agregar} />
      </div>
    </div>
  )
}