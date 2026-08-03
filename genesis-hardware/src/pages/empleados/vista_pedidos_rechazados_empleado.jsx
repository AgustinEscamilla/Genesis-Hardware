import { useState } from 'react'
import { crear_reporte_inventario } from '../../services/servicio_reportes_inventario'

const formulario_inicial = { producto: '', pedido: '', tipo: 'Mercancia dañada', descripcion: '' }

export function VistaReportesEmpleado() {
  const [formulario, set_formulario] = useState(formulario_inicial)
  const [mensaje, set_mensaje] = useState('')
  const [guardando, set_guardando] = useState(false)
  const cambiar = (campo, valor) => set_formulario({ ...formulario, [campo]: valor })
  const enviar = async (evento) => {
    evento.preventDefault(); set_guardando(true); set_mensaje('')
    try { await crear_reporte_inventario(formulario); set_formulario(formulario_inicial); set_mensaje('Reporte enviado al administrador') }
    catch (error) { set_mensaje(error.message || 'No se pudo enviar el reporte') }
    finally { set_guardando(false) }
  }
  return <main className="min-h-screen bg-fondo p-6 text-texto"><section className="mx-auto max-w-3xl rounded-lg border border-borde bg-panel p-6">
    <h2 className="text-xl font-bold">Reportes de recepción</h2><p className="mb-5 text-xs text-mutado">Registra mercancía dañada o cualquier incidencia detectada al recibir un pedido</p>
    <form onSubmit={enviar} className="grid gap-4"><input required value={formulario.producto} onChange={(e) => cambiar('producto', e.target.value)} placeholder="Producto afectado" className="rounded border border-borde bg-fondo p-3 text-sm" />
      <input value={formulario.pedido} onChange={(e) => cambiar('pedido', e.target.value)} placeholder="ID del pedido opcional" className="rounded border border-borde bg-fondo p-3 text-sm" />
      <select value={formulario.tipo} onChange={(e) => cambiar('tipo', e.target.value)} className="rounded border border-borde bg-fondo p-3 text-sm"><option>Mercancia dañada</option><option>Producto faltante</option><option>Producto incorrecto</option><option>Otro incidente</option></select>
      <textarea required value={formulario.descripcion} onChange={(e) => cambiar('descripcion', e.target.value)} placeholder="Describe lo ocurrido" rows="5" className="rounded border border-borde bg-fondo p-3 text-sm" />
      <button disabled={guardando} className="rounded border border-primario px-4 py-3 text-xs uppercase text-primario hover:bg-primario hover:text-fondo disabled:opacity-50">{guardando ? 'Enviando' : 'Enviar reporte'}</button>{mensaje && <p className="text-xs text-mutado">{mensaje}</p>}
    </form>
  </section></main>
}
