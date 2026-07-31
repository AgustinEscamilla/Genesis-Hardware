import { useMemo } from 'react'
import { usePedidosEstado } from './use_pedidos_estado'
import { ESTADOS_PEDIDO } from '../services/servicio_flujo_pedidos'

// esto sirve para que el repartidor solo vea lo que el empleado libero en el anden
export function usePaquetesAnden() {
    const { pedidos, cargando, error } = usePedidosEstado(ESTADOS_PEDIDO.LISTO_DESPACHO)
    // aqui maestro yo memorizo el filtrado para no generar un arreglo nuevo en cada render
    const pedidosLiberados = useMemo(() => pedidos.filter((p) => p.liberadoParaRepartidor === true), [pedidos])

    return { pedidosLiberados, cargando, error }
}
