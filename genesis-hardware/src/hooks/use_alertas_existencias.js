// aqui maestro yo documente este archivo para mantener trazabilidad
import { useEffect, useState } from 'react'
import { escucharInventario } from '../services/servicio_inventario'

export function useAlertasStock() {
  const [alertas, setAlertas] = useState([])

  useEffect(() => {
    const stop = escucharInventario((items) => {
      setAlertas(items.filter(i => Number(i.volumen || 0) <= Number(i.stockMinimo || 0)))
    })
    return () => stop()
  }, [])

  return { alertas }
}
