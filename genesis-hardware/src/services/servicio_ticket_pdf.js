import { jsPDF } from 'jspdf'
import { obtener_datos_ticket } from './datos_ticket_pdf'
import { dibujar_encabezado_ticket } from './encabezado_ticket_pdf'
import { dibujar_tabla_ticket } from './tabla_ticket_pdf'
import { dibujar_pie_ticket } from './pie_ticket_pdf'

export const descargar_ticket = (pedido) => {
  const datos = obtener_datos_ticket(pedido)
  const documento = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  dibujar_encabezado_ticket(documento, datos)
  const resumen_y = dibujar_tabla_ticket(documento, datos.items)
  dibujar_pie_ticket(documento, datos, resumen_y)
  const nombre_archivo = String(pedido?.id || pedido?.folio || 'pedido').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 40)
  documento.save(`ticket_${nombre_archivo}.pdf`)
}
