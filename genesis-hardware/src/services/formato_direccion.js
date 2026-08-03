const campos_direccion = ['calle', 'numero_exterior', 'numeroExterior', 'numero_interior', 'numeroInterior', 'numero_lote', 'numeroLote', 'colonia', 'municipio', 'ciudad', 'estado', 'codigo_postal', 'codigoPostal', 'referencias']

export const formatear_direccion = (direccion) => {
  if (typeof direccion === 'string') return direccion.trim()
  if (!direccion || typeof direccion !== 'object') return ''
  return campos_direccion.map((campo) => direccion[campo]).filter(Boolean).join(', ')
}
