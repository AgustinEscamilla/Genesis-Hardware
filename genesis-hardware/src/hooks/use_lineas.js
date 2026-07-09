import { useEffect, useState } from 'react'
import { actualizarLinea, agregarLinea, eliminarLinea, obtenerLineas } from '../services/servicio_lineas'

// aqui maestro yo manejo el estado de las lineas y todas las operaciones del administrador
export function useLineas() {
  const [lineas, setLineas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [seleccionada, setSeleccionada] = useState(null)
  const [recarga, setRecarga] = useState(0)

  useEffect(() => {
    // pos esto funciona cargando las lineas cada vez que recarga cambia
    obtenerLineas().then(datos => {
      setLineas(datos)
      setCargando(false)
    })
  }, [recarga])

  const guardar = async (datos) => {
    // esto sirve para actualizar o agregar segun si hay linea seleccionada
    if (seleccionada) await actualizarLinea(seleccionada.id, datos)
    else await agregarLinea(datos)
    setSeleccionada(null)
    setRecarga(n => n + 1)
  }

  const eliminar = async (id) => {
    await eliminarLinea(id)
    setRecarga(n => n + 1)
  }

  return { lineas, cargando, seleccionada, setSeleccionada, guardar, eliminar }
}
