import { useEffect, useState } from 'react'

export function useUbicacionRepartidor() {
  const [ubicacion, set_ubicacion] = useState(null)
  const [error, set_error] = useState(() => navigator.geolocation ? '' : 'Este navegador no permite obtener el GPS')

  useEffect(() => {
    if (!navigator.geolocation) return undefined
    const observar = navigator.geolocation.watchPosition(
      ({ coords }) => {
        set_ubicacion({ lat: coords.latitude, lng: coords.longitude })
        set_error('')
      },
      () => set_error('Activa el permiso de ubicación para ordenar la ruta desde tu posición'),
      { enableHighAccuracy: true, maximumAge: 15000, timeout: 10000 },
    )
    return () => navigator.geolocation.clearWatch(observar)
  }, [])

  return { ubicacion, error }
}
