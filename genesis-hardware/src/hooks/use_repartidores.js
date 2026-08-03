import { useEffect, useState } from 'react'
import { escucharUsuariosPorTipo } from '../services/servicio_cuentas'

export function useRepartidores() {
  const [repartidores, set_repartidores] = useState([])
  const [cargando, set_cargando] = useState(true)
  useEffect(() => escucharUsuariosPorTipo('repartidor', (datos) => {
    set_repartidores(datos.filter((dato) => dato.estadoActivo !== false))
    set_cargando(false)
  }, () => set_cargando(false)), [])
  return { repartidores, cargando }
}
