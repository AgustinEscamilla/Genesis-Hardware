// aqui maestro yo documente este archivo para mantener trazabilidad
import { useEffect, useState } from 'react'
import { escucharInventario } from '../services/servicio_inventario'

export function useAlertasStock() {
  const [alertas, setAlertas] = useState([])

  useEffect(() => {
    const stop = escucharInventario((items) => {
      const alertas_actualizadas = items.filter((item) => Number(item.volumen || 0) <= Number(item.stockMinimo || 0))
      setAlertas(alertas_actualizadas)
    }, () => setAlertas([]))
    return () => stop()
  }, [])

  return { alertas }
}
