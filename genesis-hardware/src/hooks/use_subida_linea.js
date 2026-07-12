import { useState } from 'react'
import { subirImagenLinea } from '../services/servicio_lineas'

// esto sirve para subir imagen de linea y guardar url de vista previa
export function useSubidaLinea() {
  const [urlImagen, setUrlImagen] = useState('')
  const [subiendo, setSubiendo] = useState(false)

  const subir = async (archivo) => {
    if (!archivo) return
    setSubiendo(true)
    setUrlImagen(await subirImagenLinea(archivo))
    setSubiendo(false)
  }

  return { urlImagen, subiendo, subir, limpiar: () => setUrlImagen('') }
}
