import { useEffect, useState } from 'react'
import { escucharOperacionesDistribuidor } from '../services/servicio_operaciones_distribuidor'
import { formatear_direccion } from '../services/formato_direccion'

const estados_abiertos = ['recibido', 'pendiente', 'solicitado']
const estados_transito = ['enviado', 'en_transito']
const estados_incidencia = ['rechazado', 'error', 'incidencia']

const transformar = (operacion) => ({
  id: operacion.id,
  tipo: 'Dropshipping',
  pedido: operacion.id.slice(0, 10),
  productos: (operacion.items || []).reduce((total, item) => total + Number(item.cantidad || 0), 0),
  items: operacion.items || [],
  estado: operacion.estado || 'recibido',
  direccion: formatear_direccion(operacion.direccion_entrega || operacion.direccionEntrega) || 'Sin direccion registrada',
  actualizado: formatear_fecha(operacion),
})

const formatear_fecha = (operacion) => {
  const valor = operacion.fecha || operacion.creadoEn || operacion.actualizadoEn || operacion.createdAt
  const fecha = valor?.toDate ? valor.toDate() : new Date(valor || Date.now())
  return fecha.toLocaleString('es-MX')
}

export function useOperacionesDistribuidor() {
  const [operaciones, setOperaciones] = useState([])
  const [cargando, setCargando] = useState(true)
  useEffect(() => escucharOperacionesDistribuidor((datos) => { setOperaciones(datos); setCargando(false) }, () => setCargando(false)), [])
  const estados = {
    abiertas: operaciones.filter((item) => estados_abiertos.includes(item.estado)).length,
    transito: operaciones.filter((item) => estados_transito.includes(item.estado)).length,
    incidencias: operaciones.filter((item) => estados_incidencia.includes(item.estado)).length,
    rma: operaciones.filter((item) => String(item.tipo || '').toLowerCase() === 'rma').length,
  }
  return { operaciones: operaciones.map(transformar), estados, cargando }
}
