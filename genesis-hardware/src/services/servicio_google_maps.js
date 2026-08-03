import { limites_logisticos, origen_logistico } from './constantes_logistica'
const clave_maps = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const gps_en_campeche = (ubicacion) => ubicacion && ubicacion.lat >= limites_logisticos.lat_min && ubicacion.lat <= limites_logisticos.lat_max && ubicacion.lng >= limites_logisticos.lng_min && ubicacion.lng <= limites_logisticos.lng_max
let promesa_maps

const cargar_maps = () => {
  if (!clave_maps) return Promise.reject(new Error('Falta VITE_GOOGLE_MAPS_API_KEY'))
  if (globalThis.google?.maps?.importLibrary) return Promise.resolve(globalThis.google.maps)
  if (promesa_maps) return promesa_maps
  promesa_maps = new Promise((resolver, rechazar) => {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(clave_maps)}&v=weekly&loading=async`
    script.async = true
    script.onload = () => resolver(globalThis.google.maps)
    script.onerror = () => rechazar(new Error('No se pudo cargar Google Maps'))
    document.head.appendChild(script)
  })
  return promesa_maps
}

const convertir_origen = (ubicacion) => gps_en_campeche(ubicacion) ? { latLng: { latitude: ubicacion.lat, longitude: ubicacion.lng } } : `${origen_logistico.lat},${origen_logistico.lng}`

export const obtener_ruta_google = async (paradas, ubicacion) => {
  if (!paradas.length) throw new Error('No hay paradas para calcular')
  if (paradas.length > 25) throw new Error('Google Maps permite hasta 25 paradas por ruta')
  const maps = await cargar_maps()
  const [{ Map: MapaGoogle }, { Route: RutaGoogle }] = await Promise.all([
    maps.importLibrary('maps'), maps.importLibrary('routes'), maps.importLibrary('marker')
  ])
  const origen = convertir_origen(ubicacion)
  const resultado = await RutaGoogle.computeRoutes({
    origin: origen, destination: origen,
    intermediates: paradas.map((parada) => ({ location: parada.direccion })),
    travelMode: 'DRIVING', optimizeWaypointOrder: true, language: 'es-MX',
    fields: ['path', 'legs', 'viewport', 'optimizedIntermediateWaypointIndices', 'distanceMeters', 'durationMillis']
  })
  if (!resultado.routes?.[0]) throw new Error('Google Maps no encontro una ruta valida')
  return { mapa_google: MapaGoogle, ruta_google: resultado.routes[0] }
}
