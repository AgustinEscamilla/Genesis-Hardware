import { useEffect, useMemo, useState } from 'react'
import { generar_ruta_simulada, iniciar_seguimiento_mock } from '../services/servicio_estafeta_mock'

// esto sirve para exponer la ubicacion en vivo y el destino del pedido simulado
export function use_rastreo_mock(pedido_id, estado_inicial = 'en_reparto') {
    const [ubicacion, set_ubicacion] = useState(null)
    const [origen_inicial, set_origen_inicial] = useState(null)
    const [estado_envio, set_estado_envio] = useState(estado_inicial === 'entregado' ? 'entregado' : 'en_transito')
    const destino = useMemo(() => pedido_id ? generar_ruta_simulada(pedido_id).at(-1) : null, [pedido_id])

    useEffect(() => {
        set_estado_envio(estado_inicial === 'entregado' ? 'entregado' : 'en_transito')
        if (!pedido_id || estado_inicial === 'entregado') return undefined
        return iniciar_seguimiento_mock(pedido_id, (punto) => {
            set_ubicacion(punto)
            set_origen_inicial((actual) => actual || punto)
            set_estado_envio(punto.estado)
        })
    }, [pedido_id, estado_inicial])

    return { ubicacion, origen_inicial, destino, estado_envio }
}
