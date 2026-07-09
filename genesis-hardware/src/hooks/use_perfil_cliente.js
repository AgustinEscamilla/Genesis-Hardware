import { useEffect, useState } from 'react'
import { datosClienteIniciales, guardarPerfilCliente, obtenerPerfilCliente } from '../services/servicio_perfil_cliente'

export function usePerfilCliente() {
  const [datos, setDatos] = useState(datosClienteIniciales)
  const [cargando, setCargando] = useState(true)
  const [requierePerfil, setRequierePerfil] = useState(true)

  useEffect(() => { obtenerPerfilCliente().then((resultado) => { setDatos(resultado.datos); setRequierePerfil(!resultado.completo); setCargando(false) }) }, [])
  const cambiarDato = (evento) => setDatos({ ...datos, [evento.target.name]: evento.target.value })

  // aqui maestro yo guardo perfil cliente en su primer ingreso
  const guardar = async (evento) => {
    evento.preventDefault()
    const ok = await guardarPerfilCliente(datos)
    if (ok) setRequierePerfil(false)
  }

  return { datos, cargando, requierePerfil, cambiarDato, guardar }
}