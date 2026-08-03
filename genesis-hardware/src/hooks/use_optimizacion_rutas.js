import { useMemo } from 'react'
import { ciudad_logistica } from '../services/constantes_logistica'
import { ZONAS_LOGISTICAS } from '../services/servicio_pedidos'
import { generar_ruta_simulada } from '../services/servicio_estafeta_mock'
import { formatear_direccion } from '../services/formato_direccion'

// aqui maestro yo agrupo los pedidos liberados por zona antes de ordenar la ruta
const agruparPorZona = (pedidos) => pedidos.reduce((acc, pedido) => {
        const zona = pedido.zonaLogistica || ciudad_logistica
    acc[zona] = acc[zona] || []
    acc[zona].push(pedido)
    return acc
}, {})

// pos esto funciona para recorrer las zonas en el orden geografico ya calculado
export function useOptimizacionRutas(pedidosLiberados = []) {
    const paradas = useMemo(() => {
        const porZona = agruparPorZona(pedidosLiberados)
        const ordenZonas = ZONAS_LOGISTICAS
        return ordenZonas.flatMap((zona) => (porZona[zona] || []).map((pedido, indice) => {
            const destino = generar_ruta_simulada(pedido.id).at(-1)
            const direccion = formatear_direccion(pedido.direccionEntrega)
            return { parada: indice + 1, zona, pedido, direccion, lat: destino.lat, lng: destino.lng }
        }))
    }, [pedidosLiberados])

    const sin_direccion = useMemo(() => paradas.filter((parada) => !parada.direccion), [paradas])

    return { paradas, sin_direccion }
}
