import { MapaPinParada } from './mapa_pin_parada'
import { almacen } from '../services/servicio_estafeta_mock'

const clave_maps = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const limitar = (valor) => Math.max(5, Math.min(95, valor))
const posicion_simulada = (punto) => ({
  x: limitar(50 + (punto.lng - almacen.lng) * 500),
  y: limitar(50 + (punto.lat - almacen.lat) * 500)
})

function MapaRutaSimulada({ paradas }) {
  return <div className="relative h-72 w-full overflow-hidden rounded-lg border border-borde bg-fondo bg-[linear-gradient(#222_1px,transparent_1px),linear-gradient(90deg,#222_1px,transparent_1px)] bg-[length:20px_20px]">
    {paradas.map((parada) => <MapaPinParada key={parada.pedido.id} porcentaje_x={posicion_simulada(parada).x} porcentaje_y={posicion_simulada(parada).y} numero={parada.parada} />)}
  </div>
}

// aqui maestro yo solo pinto el mapa con el estado que ya calculo useRutaGoogleMaps en el padre
export function MapaEntregasRepartidor({ paradas, tiene_direcciones, mapa_ref, cargando, error, resumen }) {
  if (!paradas.length) return <p className="text-xs text-mutado">No hay paradas para dibujar en el mapa todavia</p>
  if (clave_maps && tiene_direcciones) {
    if (cargando) return <p className="text-xs text-mutado">Calculando la mejor ruta con Google Maps</p>
    if (error) return <div className="border border-primario bg-fondo p-4 text-xs text-primario">{error}</div>
    return <div className="space-y-2"><div ref={mapa_ref} className="h-72 w-full rounded-lg border border-borde" />{resumen && <p className="text-xs text-mutado">Ruta optimizada {resumen.distancia} aproximadamente {resumen.duracion}</p>}</div>
  }
  return <div className="space-y-2">{!clave_maps && <p className="text-xs text-primario">Configura VITE_GOOGLE_MAPS_API_KEY para activar Google Maps</p>}{!tiene_direcciones && <p className="text-xs text-primario">Hay pedidos sin direccion de entrega guardada</p>}<MapaRutaSimulada paradas={paradas} /></div>
}
