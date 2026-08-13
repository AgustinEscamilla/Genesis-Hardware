import { formatear_precio } from './formato_moneda'

export const dibujar_tabla_ticket = (documento, items) => {
  const tabla_x = 20
  const tabla_y = 80
  const tabla_w = 170
  const col_desc = 84
  const col_cant = 24
  const col_unit = 34
  const alto_fila = 11
  documento.setFillColor(30, 34, 46)
  documento.roundedRect(tabla_x, tabla_y, tabla_w, alto_fila, 2, 2, 'FD')
  documento.setDrawColor(99, 106, 124)
  documento.setTextColor(56, 189, 248)
  documento.setFont('helvetica', 'bold')
  documento.setFontSize(9.2)
  documento.text('DESCRIPCION DE ARTICULO', tabla_x + 3, tabla_y + 7)
  documento.text('CANTIDAD', tabla_x + col_desc + 2, tabla_y + 7)
  documento.text('PRECIO UNITARIO', tabla_x + col_desc + col_cant + 2, tabla_y + 7)
  documento.text('TOTAL', tabla_x + tabla_w - 4, tabla_y + 7, { align: 'right' })
  documento.setDrawColor(99, 106, 124)
  documento.setTextColor(232, 234, 238)
  documento.setFont('helvetica', 'normal')
  documento.setFontSize(9)
  let y_fila = tabla_y + alto_fila
  items.slice(0, 10).forEach((item) => {
    const cantidad = Number.isFinite(Number(item.cantidad)) ? Number(item.cantidad) : 0
    const unitario = Number.isFinite(Number(item.precio)) ? Number(item.precio) : 0
    const total_item = Number((unitario * cantidad).toFixed(2))
    const descripcion = String(item.nombre || 'ARTICULO').toUpperCase()
    const nombre = descripcion.length > 38 ? `${descripcion.slice(0, 37)}...` : descripcion
    documento.rect(tabla_x, y_fila, tabla_w, alto_fila, 'S')
    documento.line(tabla_x + col_desc, y_fila, tabla_x + col_desc, y_fila + alto_fila)
    documento.line(tabla_x + col_desc + col_cant, y_fila, tabla_x + col_desc + col_cant, y_fila + alto_fila)
    documento.line(tabla_x + col_desc + col_cant + col_unit, y_fila, tabla_x + col_desc + col_cant + col_unit, y_fila + alto_fila)
    documento.text(nombre, tabla_x + 3, y_fila + 7)
    documento.text(String(cantidad), tabla_x + col_desc + col_cant - 3, y_fila + 7, { align: 'right' })
    documento.text(formatear_precio(unitario), tabla_x + col_desc + col_cant + col_unit - 3, y_fila + 7, { align: 'right' })
    documento.setTextColor(244, 114, 182)
    documento.text(formatear_precio(total_item), tabla_x + tabla_w - 3, y_fila + 7, { align: 'right' })
    documento.setTextColor(232, 234, 238)
    y_fila += alto_fila
  })
  return y_fila + 6
}
