import { MapaPinParada } from './mapa_pin_parada'
import { almacen } from '../services/servicio_estafeta_mock'

const clave_maps = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const limitar = (valor) => Math.max(5, Math.min(95, valor))

// esto sirve para armar la url de direcciones reales cuando si hay clave configurada
const armarUrlDirecciones = (paradas) => {
    const puntos = [almacen, ...paradas.map((p) => ({ lat: p.lat, lng: p.lng }))]
    const origen = `${puntos[0].lat},${puntos[0].lng}`
    const destino = `${puntos.at(-1).lat},${puntos.at(-1).lng}`
    const intermedias = puntos.slice(1, -1).map((p) => `${p.lat},${p.lng}`).join('|')
    const base = `https://www.google.com/maps/embed/v1/directions?key=${clave_maps}&origin=${origen}&destination=${destino}`
    return intermedias ? `${base}&waypoints=${intermedias}` : base
}

// pos esto funciona para simular el mapa con pines numerados cuando no hay clave real
const posicionSimulada = (punto) => ({
    x: limitar(50 + (punto.lng - almacen.lng) * 500),
    y: limitar(50 + (punto.lat - almacen.lat) * 500)
})

// esto sirve para dibujar la ruta completa del repartidor con sus paradas en orden
export function MapaEntregasRepartidor({ paradas }) {
    if (!paradas.length) return <p className="text-xs text-mutado">No hay paradas para dibujar en el mapa todavia</p>

    if (clave_maps) {
        return <iframe title="mapa de rutas" className="w-full h-72 border border-borde rounded-lg" src={armarUrlDirecciones(paradas)} />
    }

    return (
        <div className="relative w-full h-72 border border-borde rounded-lg bg-fondo overflow-hidden bg-[linear-gradient(#222_1px,transparent_1px),linear-gradient(90deg,#222_1px,transparent_1px)] bg-[length:20px_20px]">
            {paradas.map((parada) => {
                const posicion = posicionSimulada(parada)
                return <MapaPinParada key={parada.pedido.id} porcentaje_x={posicion.x} porcentaje_y={posicion.y} numero={parada.parada} />
            })}
        </div>
    )
}
