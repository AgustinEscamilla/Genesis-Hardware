import { useEffect, useMemo, useState } from 'react'
import { escucharReclamosAdministrador } from '../services/servicio_reclamos'
import { escucharReportesFallas } from '../services/servicio_reporte_fallas'
import { escuchar_reportes_inventario } from '../services/servicio_reportes_inventario'

const fechaEnMs = (valor) => {
  if (!valor) return 0
  if (typeof valor?.toMillis === 'function') return valor.toMillis()
  const fecha = new Date(valor).getTime()
  return Number.isNaN(fecha) ? 0 : fecha
}

const ordenarPorFecha = (datos) => [...datos].sort((a, b) => fechaEnMs(b.fecha) - fechaEnMs(a.fecha))

export function useReportesAdministrador() {
  const [reclamos, setReclamos] = useState([])
  const [reportesFallas, setReportesFallas] = useState([])
  const [reportesEmpleado, setReportesEmpleado] = useState([])
  const [cargandoReclamos, setCargandoReclamos] = useState(true)
  const [cargandoFallas, setCargandoFallas] = useState(true)
  const [cargandoEmpleado, setCargandoEmpleado] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const detenerReclamos = escucharReclamosAdministrador((datos) => {
      setReclamos(ordenarPorFecha(datos))
      setCargandoReclamos(false)
      setError('')
    }, () => {
      setReclamos([])
      setCargandoReclamos(false)
      setError('No se pudieron cargar los reclamos de clientes')
    })

    const detenerFallas = escucharReportesFallas((datos) => {
      setReportesFallas(ordenarPorFecha(datos))
      setCargandoFallas(false)
      setError('')
    }, () => {
      setReportesFallas([])
      setCargandoFallas(false)
      setError('No se pudieron cargar los reportes de repartidores')
    })

    const detenerEmpleado = escuchar_reportes_inventario((datos) => {
      setReportesEmpleado(ordenarPorFecha(datos))
      setCargandoEmpleado(false)
      setError('')
    }, () => {
      setReportesEmpleado([])
      setCargandoEmpleado(false)
      setError('No se pudieron cargar los reportes de empleados')
    })

    return () => {
      detenerReclamos()
      detenerFallas()
      detenerEmpleado()
    }
  }, [])

  const resumen = useMemo(() => ({
    totalReclamos: reclamos.length,
    totalFallas: reportesFallas.length,
    totalEmpleado: reportesEmpleado.length,
  }), [reclamos.length, reportesEmpleado.length, reportesFallas.length])

  return {
    reclamos,
    reportesFallas,
    reportesEmpleado,
    resumen,
    cargando: cargandoReclamos || cargandoFallas || cargandoEmpleado,
    error,
  }
}
