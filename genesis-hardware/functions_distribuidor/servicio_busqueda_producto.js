const limpiar_nombre = (valor = '') => String(valor)
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  .replace(/^procesador\s+/, '').split(',')[0].trim()

const buscar_por_nombre = async (transaccion, base_datos, nombre_producto) => {
  const nombre_buscado = limpiar_nombre(nombre_producto)
  if (!nombre_buscado) return null
  const catalogo = await transaccion.get(base_datos.collection('catalogo'))
  return catalogo.docs.find((documento) => {
    const nombre = limpiar_nombre(documento.data()?.nombre)
    return nombre === nombre_buscado || nombre.includes(nombre_buscado) || nombre_buscado.includes(nombre)
  })
}

export const buscar_producto = async (transaccion, base_datos, sku, nombre_producto) => {
  const directa_ref = base_datos.collection('catalogo').doc(sku)
  const directa = await transaccion.get(directa_ref)
  if (directa.exists) return { referencia: directa_ref, documento: directa }
  for (const campo of ['sku_distribuidor', 'distributorSku', 'sku']) {
    const resultado = await transaccion.get(base_datos.collection('catalogo').where(campo, '==', sku).limit(1))
    if (!resultado.empty) return { referencia: resultado.docs[0].ref, documento: resultado.docs[0] }
  }
  const encontrado = await buscar_por_nombre(transaccion, base_datos, nombre_producto)
  if (encontrado) return { referencia: encontrado.ref, documento: encontrado }
  throw new Error(`Producto no encontrado ${sku}`)
}
