import { useMemo } from 'react'
import { ZONAS_LOGISTICAS } from '../services/servicio_pedidos'
import { generar_ruta_simulada } from '../services/servicio_estafeta_mock'

// aqui maestro yo agrupo los pedidos liberados por zona antes de ordenar la ruta
const agruparPorZona = (pedidos) => pedidos.reduce((acc, pedido) => {
    const zona = pedido.zonaLogistica || 'sin_zona'
    acc[zona] = acc[zona] || []
    acc[zona].push(pedido)
    return acc
}, {})

// pos esto funciona para recorrer las zonas en el orden geografico ya calculado
export function useOptimizacionRutas(pedidosLiberados = []) {
    const paradas = useMemo(() => {
        const porZona = agruparPorZona(pedidosLiberados)
        const ordenZonas = [...ZONAS_LOGISTICAS, 'sin_zona']
        let contador = 0
        return ordenZonas.flatMap((zona) => (porZona[zona] || []).map((pedido) => {
            contador += 1
            const destino = generar_ruta_simulada(pedido.id).at(-1)
            return { parada: contador, zona, pedido, lat: destino.lat, lng: destino.lng }
        }))
    }, [pedidosLiberados])

    return { paradas }
}
