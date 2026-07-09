import { useState } from 'react'
import { subirImagenProducto } from '../services/servicio_catalogo'

// aqui maestro yo manejo la subida del archivo a storage y guardo la url resultante
export function useSubidaImagen() {
  const [urlImagen, setUrlImagen] = useState('')
  const [subiendo, setSubiendo] = useState(false)

  const subir = async (archivo) => {
    // esto sirve para subir el archivo y actualizar la url cuando termina
    if (!archivo) return
    setSubiendo(true)
    const url = await subirImagenProducto(archivo)
    setUrlImagen(url)
    setSubiendo(false)
  }

  const limpiar = () => setUrlImagen('')

  return { urlImagen, subiendo, subir, limpiar }
}
