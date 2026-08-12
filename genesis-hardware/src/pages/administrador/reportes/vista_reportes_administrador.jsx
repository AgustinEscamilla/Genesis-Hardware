import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReportesAdministrador } from '../../../hooks/use_reportes_administrador'
import { responderReclamo } from '../../../services/servicio_reclamos'
import { responderReporteFalla } from '../../../services/servicio_reporte_fallas'
import { responder_reporte_inventario } from '../../../services/servicio_reportes_inventario'

const textoFecha = (valor) => {
  if (!valor) return 'Sin fecha'
  const fecha = typeof valor?.toDate === 'function' ? valor.toDate() : new Date(valor)
  return Number.isNaN(fecha.getTime()) ? 'Sin fecha' : fecha.toLocaleString('es-MX')
}

const TarjetaResumen = ({ titulo, valor }) => (
  <div className="rounded-lg border border-borde bg-panel p-4">
    <p className="text-xs uppercase tracking-widest text-mutado">{titulo}</p>
    <p className="mt-2 text-2xl font-black text-texto">{valor}</p>
  </div>
)

export function VistaReportesAdministrador() {
  const { reclamos, reportesFallas, reportesEmpleado, resumen, cargando, error } = useReportesAdministrador()
  const [respuestas, setRespuestas] = useState({})
  const [guardandoId, setGuardandoId] = useState('')
  const [mensajeAccion, setMensajeAccion] = useState('')

  if (cargando) return <div className="flex min-h-40 items-center justify-center text-xs text-mutado">Cargando reportes</div>

  const valorRespuesta = (id, respuestaExistente = '') => respuestas[id] ?? respuestaExistente ?? ''
  const cambiarRespuesta = (id, valor) => setRespuestas((actual) => ({ ...actual, [id]: valor }))
  const responder = async (tipo, id, respuestaExistente) => {
    const respuesta = valorRespuesta(id, respuestaExistente).trim()
    if (!respuesta) {
      setMensajeAccion('Escribe una respuesta antes de guardar')
      return
    }
    setGuardandoId(id)
    setMensajeAccion('')
    try {
      if (tipo === 'cliente') await responderReclamo({ reclamoId: id, respuesta })
      if (tipo === 'repartidor') await responderReporteFalla({ reporteId: id, respuesta })
      if (tipo === 'empleado') await responder_reporte_inventario({ reporteId: id, respuesta })
      setMensajeAccion('Respuesta guardada correctamente')
      setRespuestas((actual) => ({ ...actual, [id]: respuesta }))
    } catch {
      setMensajeAccion('No se pudo guardar la respuesta')
    } finally {
      setGuardandoId('')
    }
  }

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-borde pb-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primario">Control administrativo</p>
          <h1 className="mt-2 text-3xl font-black text-texto">Reportes de cuentas</h1>
          <p className="mt-2 max-w-2xl text-sm text-mutado">Aquí se concentran los reportes de repartidores, empleados y clientes.</p>
        </div>
        <Link to="../dashboard" className="border border-borde px-4 py-2 text-xs font-bold uppercase tracking-wide text-texto hover:border-primario">
          Volver a dashboard
        </Link>
      </header>

      {error && <div className="rounded-lg border border-primario/50 bg-primario/10 p-4 text-sm text-primario">{error}</div>}
      {mensajeAccion && <div className="rounded-lg border border-primario/50 bg-primario/10 p-3 text-xs text-primario">{mensajeAccion}</div>}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <TarjetaResumen titulo="Reclamos de clientes" valor={resumen.totalReclamos} />
        <TarjetaResumen titulo="Fallas de repartidores" valor={resumen.totalFallas} />
        <TarjetaResumen titulo="Reportes de empleados" valor={resumen.totalEmpleado} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <article className="rounded-lg border border-borde bg-panel p-5">
          <h2 className="text-lg font-black text-texto">Clientes</h2>
          <p className="mb-4 mt-1 text-xs text-mutado">Reclamos por pedidos</p>
          {!reclamos.length && <p className="text-xs text-mutado">No hay reclamos de clientes</p>}
          <div className="space-y-3">
            {reclamos.map((reclamo) => (
              <div key={reclamo.id} className="rounded border border-borde bg-fondo p-3 text-xs">
                <p className="font-bold text-texto">{reclamo.motivo || 'Sin motivo'}</p>
                <p className="mt-1 text-mutado">{reclamo.descripcion || 'Sin descripción'}</p>
                <p className="mt-2 text-[10px] uppercase tracking-widest text-mutado">Pedido {String(reclamo.pedidoId || 'N/A').slice(0, 12)}</p>
                <p className="mt-1 text-[10px] text-mutado">{textoFecha(reclamo.fecha)}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-mutado">Estado {reclamo.estado || 'pendiente'}</p>
                <textarea
                  value={valorRespuesta(reclamo.id, reclamo.respuesta)}
                  onChange={(evento) => cambiarRespuesta(reclamo.id, evento.target.value)}
                  placeholder="Responder al cliente"
                  rows={2}
                  className="mt-2 w-full rounded border border-borde bg-panel px-2 py-1 text-xs text-texto"
                />
                <button
                  type="button"
                  onClick={() => responder('cliente', reclamo.id, reclamo.respuesta)}
                  disabled={guardandoId === reclamo.id}
                  className="mt-2 rounded border border-primario px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-primario hover:bg-primario hover:text-fondo disabled:opacity-50"
                >
                  {guardandoId === reclamo.id ? 'Guardando...' : 'Guardar respuesta'}
                </button>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-lg border border-borde bg-panel p-5">
          <h2 className="text-lg font-black text-texto">Repartidores</h2>
          <p className="mb-4 mt-1 text-xs text-mutado">Reportes de fallas</p>
          {!reportesFallas.length && <p className="text-xs text-mutado">No hay reportes de repartidor</p>}
          <div className="space-y-3">
            {reportesFallas.map((reporte) => (
              <div key={reporte.id} className="rounded border border-borde bg-fondo p-3 text-xs">
                <p className="font-bold text-texto">{reporte.cofre || 'Sin sección'}</p>
                <p className="mt-1 text-mutado">{reporte.mensaje || 'Sin descripción'}</p>
                <p className="mt-2 text-[10px] uppercase tracking-widest text-mutado">Repartidor {String(reporte.repartidorId || 'N/A').slice(0, 12)}</p>
                <p className="mt-1 text-[10px] text-mutado">{textoFecha(reporte.fecha)}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-mutado">Estado {reporte.estado || 'pendiente'}</p>
                <textarea
                  value={valorRespuesta(reporte.id, reporte.respuesta)}
                  onChange={(evento) => cambiarRespuesta(reporte.id, evento.target.value)}
                  placeholder="Responder al repartidor"
                  rows={2}
                  className="mt-2 w-full rounded border border-borde bg-panel px-2 py-1 text-xs text-texto"
                />
                <button
                  type="button"
                  onClick={() => responder('repartidor', reporte.id, reporte.respuesta)}
                  disabled={guardandoId === reporte.id}
                  className="mt-2 rounded border border-primario px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-primario hover:bg-primario hover:text-fondo disabled:opacity-50"
                >
                  {guardandoId === reporte.id ? 'Guardando...' : 'Guardar respuesta'}
                </button>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-lg border border-borde bg-panel p-5">
          <h2 className="text-lg font-black text-texto">Empleados</h2>
          <p className="mb-4 mt-1 text-xs text-mutado">Incidencias de inventario</p>
          {!reportesEmpleado.length && <p className="text-xs text-mutado">No hay reportes de empleado</p>}
          <div className="space-y-3">
            {reportesEmpleado.map((reporte) => (
              <div key={reporte.id} className="rounded border border-borde bg-fondo p-3 text-xs">
                <p className="font-bold text-texto">{reporte.tipo || 'Sin tipo'}</p>
                <p className="mt-1 text-mutado">{reporte.descripcion || 'Sin descripción'}</p>
                <p className="mt-2 text-[10px] uppercase tracking-widest text-mutado">Empleado {String(reporte.empleadoId || 'N/A').slice(0, 12)}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-mutado">Producto {reporte.producto || 'N/A'}</p>
                <p className="mt-1 text-[10px] text-mutado">{textoFecha(reporte.fecha)}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-mutado">Estado {reporte.estado || 'pendiente'}</p>
                <textarea
                  value={valorRespuesta(reporte.id, reporte.respuesta)}
                  onChange={(evento) => cambiarRespuesta(reporte.id, evento.target.value)}
                  placeholder="Responder al empleado"
                  rows={2}
                  className="mt-2 w-full rounded border border-borde bg-panel px-2 py-1 text-xs text-texto"
                />
                <button
                  type="button"
                  onClick={() => responder('empleado', reporte.id, reporte.respuesta)}
                  disabled={guardandoId === reporte.id}
                  className="mt-2 rounded border border-primario px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-primario hover:bg-primario hover:text-fondo disabled:opacity-50"
                >
                  {guardandoId === reporte.id ? 'Guardando...' : 'Guardar respuesta'}
                </button>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
