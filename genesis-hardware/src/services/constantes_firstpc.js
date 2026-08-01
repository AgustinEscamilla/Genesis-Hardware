export const categorias_firstpc = ['Procesadores', 'Tarjetas de video', 'Tarjetas madre', 'Gabinetes', 'Enfriamiento', 'Memorias RAM', 'Almacenamiento', 'Fuentes de poder', 'Monitores', 'Computadoras', 'Teclados', 'Mouses', 'Audífonos gaming']

export const marcas_firstpc = ['ASUS', 'AMD', 'Intel', 'Corsair', 'MSI', 'Gigabyte', 'NVIDIA', 'Western Digital']

export const obtener_marca_producto = (producto) => {
  if (producto.marca) return producto.marca
  const nombre = String(producto.nombre || '').toLowerCase()
  return marcas_firstpc.find((marca) => nombre.includes(marca.toLowerCase())) || 'GENÉRICO'
}
