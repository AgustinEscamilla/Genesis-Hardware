import { useState } from 'react'

// aqui maestro yo manejo la subida del archivo a storage y guardo la url resultante
export function useSubidaImagen() {
  const [urlImagen, setUrlImagen] = useState('')
  const [subiendo, setSubiendo] = useState(false)
  const [mensaje, setMensaje] = useState('')

  const subir = async (archivo) => {
    // esto sirve para subir el archivo y actualizar la url cuando termina
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
      setMensaje('Imagen de producto subida exitosamente')
    } catch {
      setMensaje('No se pudo subir la imagen del producto')
    } finally { setSubiendo(false) }
  }

  const limpiar = () => { setUrlImagen(''); setMensaje('') }

  return { urlImagen, subiendo, mensaje, subir, limpiar }
}
