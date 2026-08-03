// aqui maestro yo calculo la rentabilidad por zona a partir de pedidos entregados
export const calcularRentabilidadPorZona = (pedidosEntregados = []) => {
    const porZona = pedidosEntregados.reduce((acc, p) => {
        const zona = p.zonaLogistica || 'campeche'
        acc[zona] = acc[zona] || { zona, totalVentas: 0, cantidadPedidos: 0 }
        acc[zona].totalVentas += Number(p.total || 0)
        acc[zona].cantidadPedidos += 1
        return acc
    }, {})
    return Object.values(porZona).map((z) => ({ ...z, ticketPromedio: z.totalVentas / z.cantidadPedidos }))
}

// pos esto funciona para medir la eficacia de cada repartidor segun entregas y rechazos
export const calcularEficaciaRepartidores = (pedidosEntregados = [], pedidosRechazados = []) => {
    const conteo = {}
    const sumar = (lista, campo) => lista.forEach((p) => {
        const id = p.repartidorId || 'sin_asignar'
        conteo[id] = conteo[id] || { repartidorId: id, entregados: 0, rechazados: 0 }
        conteo[id][campo] += 1
    })
    sumar(pedidosEntregados, 'entregados')
    sumar(pedidosRechazados, 'rechazados')
    return Object.values(conteo).map((r) => ({ ...r, tasaExito: r.entregados / (r.entregados + r.rechazados) }))
}
