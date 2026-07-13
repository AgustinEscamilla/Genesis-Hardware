import { useState } from 'react'

// esto sirve para subir imagen de linea y guardar url de vista previa
export function useSubidaLinea() {
  const [urlImagen, setUrlImagen] = useState('')
  const [subiendo, setSubiendo] = useState(false)
  const [mensaje, setMensaje] = useState('')

  const subir = async (archivo) => {
    if (!archivo) return
    setSubiendo(true)
    setMensaje('')
    try {
      const url = await new Promise((resolver, rechazar) => {
        const lector = new FileReader()
        lector.onload = () => resolver(String(lector.result || ''))
        lector.onerror = () => rechazar(new Error('lectura fallida'))
        lector.readAsDataURL(archivo)
      })
      setUrlImagen(url)
      setMensaje('Imagen de linea subida exitosamente')
    } catch {
      setMensaje('No se pudo subir la imagen de linea')
    } finally { setSubiendo(false) }
  }

  return { urlImagen, subiendo, mensaje, subir, limpiar: () => { setUrlImagen(''); setMensaje('') } }
}
