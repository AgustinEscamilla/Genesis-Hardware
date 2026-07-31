import { useEffect, useState } from 'react'
import { escucharOperacionesDistribuidor } from '../services/servicio_operaciones_distribuidor'

const estados_abiertos = ['recibido', 'pendiente', 'solicitado']
const estados_transito = ['enviado', 'en_transito']
const estados_incidencia = ['rechazado', 'error', 'incidencia']

const transformar = (operacion) => ({
  id: operacion.id,
  tipo: 'Dropshipping',
  pedido: operacion.id.slice(0, 10),
  productos: (operacion.items || []).reduce((total, item) => total + Number(item.cantidad || 0), 0),
  estado: operacion.estado || 'recibido',
  actualizado: new Date(operacion.fecha || Date.now()).toLocaleString('es-MX'),
})

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
