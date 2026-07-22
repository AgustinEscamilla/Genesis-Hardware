import { MapaMarcadorMovil } from './mapa_marcador_movil'

const clave_maps = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const limitar = (valor) => Math.max(5, Math.min(95, valor))

// esto sirve para mostrar el mapa real o el mapa simulado segun la configuracion
export function MapaEntrega({ ubicacion, destino }) {
    if (!ubicacion || !destino) return <p className="text-xs text-mutado">Calculando ubicacion</p>

    if (clave_maps) {
        const src = `https://www.google.com/maps/embed/v1/place?key=${clave_maps}&q=${destino.lat},${destino.lng}`
        return <iframe title="mapa entrega" className="w-full h-64 border border-borde" src={src} />
    }

    const porcentaje_x = limitar(50 + (ubicacion.lng - destino.lng) * 4000)
    const porcentaje_y = limitar(50 + (ubicacion.lat - destino.lat) * 4000)

    return (
        <div className="relative w-full h-64 border border-borde bg-fondo overflow-hidden bg-[linear-gradient(#222_1px,transparent_1px),linear-gradient(90deg,#222_1px,transparent_1px)] bg-[length:20px_20px]">
            <MapaMarcadorMovil porcentaje_x={porcentaje_x} porcentaje_y={porcentaje_y} />
            <div className="absolute right-2 bottom-2 w-3 h-3 rounded-full bg-[#fca5a5]" title="destino" />
        </div>
    )
}
