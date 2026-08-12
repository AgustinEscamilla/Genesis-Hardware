import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAutenticacion } from './use_autenticacion'
import { guardarOnboardingStaff, obtenerOnboardingStaff } from '../services/servicio_onboarding_staff'

const opcionesVehiculo = ['coche', 'camioneta', 'camion']

const validarDatosGenericos = (rol, datos) => {
  const errores = []
  const texto = (valor) => String(valor ?? '').trim()

  const nombres = texto(datos.nombres)
  const apellidoPaterno = texto(datos.apellidoPaterno)
  const apellidoMaterno = texto(datos.apellidoMaterno)
  const telefono = texto(datos.telefono).replace(/\D/g, '')
  const direccion = texto(datos.direccionVivienda)
  const colonia = texto(datos.colonia)
  const codigoPostal = texto(datos.codigoPostal).replace(/\D/g, '')
  const tipoVehiculo = texto(datos.tipoVehiculo).toLowerCase()

  if (!nombres) errores.push('El nombre es obligatorio')
  if (!apellidoPaterno) errores.push('El apellido paterno es obligatorio')
  if (!apellidoMaterno) errores.push('El apellido materno es obligatorio')
  if (!telefono || telefono.length !== 10) errores.push('El telefono debe tener 10 digitos')
  if (!direccion || direccion.length < 8) errores.push('La direccion debe tener al menos 8 caracteres')
  if (rol === 'empleado' && (!colonia || colonia.length < 3)) errores.push('La colonia es obligatoria')
  if (rol === 'empleado' && (!codigoPostal || codigoPostal.length !== 5)) errores.push('El codigo postal debe tener 5 digitos')
  if (rol === 'repartidor' && !opcionesVehiculo.includes(tipoVehiculo)) errores.push('Selecciona si es coche camioneta o camion')

  return errores
}

export function useOnboardingStaff({ rol, rutaPanel, datosIniciales }) {
  const [parametros] = useSearchParams()
  const { usuarioActual } = useAutenticacion()
  const [datos, setDatos] = useState(datosIniciales)
  const [guardando, setGuardando] = useState(false)
  const [cargando_perfil, setCargandoPerfil] = useState(true)
  const [mensaje_error, setMensajeError] = useState('')
  const navegar = useNavigate()

  const resolverCorreo = () => parametros.get('correo') || usuarioActual?.email || usuarioActual?.correo || ''

  useEffect(() => {
    const uidAuth = usuarioActual?.uid
    if (!uidAuth) {
      setCargandoPerfil(false)
      return
    }
    let activo = true
    const cargarPerfil = async () => {
      setCargandoPerfil(true)
      try {
        const correo = parametros.get('correo') || usuarioActual?.email || usuarioActual?.correo || ''
        const perfil = await obtenerOnboardingStaff({ rol, correo, uidAuth })
        if (!activo || !perfil) return
        setDatos((actual) => ({ ...actual, ...perfil }))
      } catch {
        if (activo) setMensajeError('No se pudo cargar el perfil actual')
      } finally {
        if (activo) setCargandoPerfil(false)
      }
    }
    cargarPerfil()
    return () => { activo = false }
  }, [rol, parametros, usuarioActual?.correo, usuarioActual?.email, usuarioActual?.uid])

  const cambiarDato = (evento) => {
    const valor = evento.target.value
    setDatos((actual) => ({ ...actual, [evento.target.name]: valor }))
    if (mensaje_error) setMensajeError('')
  }

  const guardar = async (evento) => {
    evento.preventDefault()
    if (!usuarioActual?.uid || guardando || cargando_perfil) return

    const errores = validarDatosGenericos(rol, datos)
    if (errores.length) {
      setMensajeError(errores[0])
      return
    }

    setGuardando(true)
    setMensajeError('')
    const correo = resolverCorreo()
    try {
      const datosNormalizados = {
        ...datos,
        rol,
        uidAuth: usuarioActual.uid,
        correo: String(correo ?? '').trim().toLowerCase(),
        nombres: String(datos.nombres ?? '').trim(),
        apellidoPaterno: String(datos.apellidoPaterno ?? '').trim(),
        apellidoMaterno: String(datos.apellidoMaterno ?? '').trim(),
        telefono: String(datos.telefono ?? '').replace(/\D/g, ''),
        direccionVivienda: String(datos.direccionVivienda ?? '').trim(),
        colonia: String(datos.colonia ?? '').trim(),
        codigoPostal: String(datos.codigoPostal ?? '').replace(/\D/g, ''),
        tipoVehiculo: String(datos.tipoVehiculo ?? '').trim().toLowerCase(),
      }

      await guardarOnboardingStaff({ rol, correo, uidAuth: usuarioActual.uid, datos: datosNormalizados })
      navegar(rutaPanel, { replace: true })
    } catch (error) {
      setMensajeError(error?.message || 'No se pudo guardar el registro')
    } finally {
      setGuardando(false)
    }
  }

  return { datos, cambiarDato, guardar, guardando, cargando_perfil, mensaje_error }
}
