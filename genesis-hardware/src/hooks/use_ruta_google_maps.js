import { useEffect, useRef, useState } from 'react'
import { obtener_ruta_google } from '../services/servicio_google_maps'
const limpiar_elementos = (elementos) => elementos.forEach((elemento) => {
  if ('setMap' in elemento) elemento.setMap(null)
  if ('map' in elemento) elemento.map = null
})
// esto sirve para que la lista de paradas quede en el mismo orden que google ya optimizo
const reordenar_paradas = (paradas, orden) => {
  if (!orden || orden.length !== paradas.length) return paradas
  return orden.map((indiceOriginal, posicion) => ({ ...paradas[indiceOriginal], parada: posicion + 1 }))
}
export function useRutaGoogleMaps(paradas, ubicacion) {
  const mapa_ref = useRef(null)
  const elementos_ref = useRef([])
  const [cargando, set_cargando] = useState(false)
  const [error, set_error] = useState('')
  const [resumen, set_resumen] = useState(null)
  const [orden_optimizado, set_orden_optimizado] = useState(null)
  useEffect(() => {
    if (!paradas.length || paradas.some((parada) => !parada.direccion)) return undefined
    let activo = true
    Promise.resolve().then(() => {
      if (!activo) return null
      set_cargando(true)
      set_error('')
      set_orden_optimizado(null)
      return obtener_ruta_google(paradas, ubicacion)
    }).then((datos) => {
      if (!datos) return
      const { mapa_google, ruta_google } = datos
      if (!activo || !mapa_ref.current) return
      limpiar_elementos(elementos_ref.current)
      const centro = ubicacion || { lat: 19.8301, lng: -90.5349 }
      const mapa = new mapa_google(mapa_ref.current, { center: centro, zoom: 11, mapId: 'DEMO_MAP_ID', mapTypeControl: false })
      const polilineas = ruta_google.createPolylines({ polylineOptions: { strokeColor: '#ff4d4f', strokeWeight: 5 } })
      polilineas.forEach((polilinea) => polilinea.setMap(mapa))
      return ruta_google.createWaypointAdvancedMarkers({ map: mapa }).then((marcadores) => {
        if (!activo) return limpiar_elementos(marcadores)
        elementos_ref.current = [...polilineas, ...marcadores]
        if (ruta_google.viewport) mapa.fitBounds(ruta_google.viewport)
        set_resumen({ distancia: `${((ruta_google.distanceMeters || 0) / 1000).toFixed(1)} km`, duracion: `${Math.ceil((ruta_google.durationMillis || 0) / 60000)} min` })
        set_orden_optimizado(ruta_google.optimizedIntermediateWaypointIndices || null)
      })
    }).catch((e) => activo && set_error(String(e?.message || 'No se pudo calcular la ruta')))
      .finally(() => activo && set_cargando(false))
    return () => { activo = false; limpiar_elementos(elementos_ref.current) }
  }, [paradas, ubicacion])

  return { mapa_ref, cargando, error, resumen, paradas_ordenadas: reordenar_paradas(paradas, orden_optimizado) }
}
