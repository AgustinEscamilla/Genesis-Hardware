import { useMemo } from 'react'
import { usePedidosEstado } from './use_pedidos_estado'
import { ESTADOS_PEDIDO } from '../services/servicio_flujo_pedidos'
import { calcularRentabilidadPorZona, calcularEficaciaRepartidores } from '../services/servicio_metricas'

// esto sirve para exponer las metricas del dashboard analitico al administrador
export function useMetricasAdministrador() {
    const { pedidos: entregados, cargando: cargando_entregados, error: error_entregados } = usePedidosEstado(ESTADOS_PEDIDO.ENTREGADO)
    const { pedidos: rechazados, cargando: cargando_rechazados, error: error_rechazados } = usePedidosEstado(ESTADOS_PEDIDO.RECHAZADO)

    const rentabilidadPorZona = useMemo(() => calcularRentabilidadPorZona(entregados), [entregados])
    const eficaciaRepartidores = useMemo(() => calcularEficaciaRepartidores(entregados, rechazados), [entregados, rechazados])

    return {
        rentabilidadPorZona,
        eficaciaRepartidores,
        cargando: cargando_entregados || cargando_rechazados,
        error: error_entregados || error_rechazados,
    }
}
