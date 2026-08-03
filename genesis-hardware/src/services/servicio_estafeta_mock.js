export const almacen = { lat: 19.8301, lng: -90.5349 }

// aqui maestro yo genero una ruta falsa determinista a partir del folio del pedido
export const generar_ruta_simulada = (pedido_id) => {
    const semilla = String(pedido_id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
    const destino = { lat: almacen.lat + ((semilla % 50) / 1000), lng: almacen.lng + ((semilla % 70) / 1000) }
    const pasos = 6
    return Array.from({ length: pasos + 1 }, (_, i) => ({
        lat: almacen.lat + (destino.lat - almacen.lat) * (i / pasos),
        lng: almacen.lng + (destino.lng - almacen.lng) * (i / pasos),
        estado: i === pasos ? 'entregado' : 'en_transito'
    }))
}

// pos esto funciona para simular el avance del repartidor como la api real de estafeta
export const iniciar_seguimiento_mock = (pedido_id, al_actualizar) => {
    const ruta = generar_ruta_simulada(pedido_id)
    let indice = 0
    al_actualizar(ruta[0])
    const intervalo = setInterval(() => {
        indice = Math.min(indice + 1, ruta.length - 1)
        al_actualizar(ruta[indice])
        if (indice === ruta.length - 1) clearInterval(intervalo)
    }, 3000)
    return () => clearInterval(intervalo)
}
