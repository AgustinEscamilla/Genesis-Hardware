import { obtenerCatalogo, actualizarProducto } from './servicio_catalogo'
import { productos_discos } from './datos_catalogo_discos'
import { productos_memoria } from './datos_catalogo_memoria'
import { productos_procesadores } from './datos_catalogo_procesadores'
import { productos_procesadores_extra } from './datos_catalogo_procesadores_extra'
import { productos_ssd } from './datos_catalogo_ssd'
import { productos_video } from './datos_catalogo_video'
import { productos_video_extra } from './datos_catalogo_video_extra'

// aqui maestro yo junto todos los productos de semilla para buscar el precio real por nombre
const productos_semilla = [
  ...productos_discos,
  ...productos_memoria,
  ...productos_procesadores,
  ...productos_procesadores_extra,
  ...productos_ssd,
  ...productos_video,
  ...productos_video_extra
]

export const repararPreciosCatalogo = async () => {
  // esto sirve para ponerle precio real a los productos viejos que se sembraron sin ese campo
  const catalogo_actual = await obtenerCatalogo()
  let reparados = 0
  for (const producto of catalogo_actual) {
    if (producto.precio) continue
    const referencia = productos_semilla.find(p => p.nombre === producto.nombre)
    if (referencia) {
      await actualizarProducto(producto.id, { precio: referencia.precio })
      reparados++
    }
  }
  return reparados
}
