import { useState } from 'react'
import { FormularioAltaCuenta } from './formulario_alta_cuenta'
import { crearCuenta } from '../../services/servicio_cuentas'

// aqui puse profe el contenedor padre que maneja todos los estados de los datos del formulario
export function VistaCrearCuentasAdministrador() {
  const [tipoCuenta, setTipoCuenta] = useState('empleado')
  const [formulario, setFormulario] = useState({ nombre: '', correo: '', contrasena: '', confirmar: '' })
  const [mensajeFormulario, setMensajeFormulario] = useState('')

  const manejarCambio = (campo) => (event) => setFormulario((actual) => ({ ...actual, [campo]: event.target.value }))
  
  // maestro funciona asi yo atrapo el evento del boton para validar todo y mandarlo al servicio de firebase
  const manejarEnvio = async (event) => {
    event.preventDefault()
    setMensajeFormulario('')
    if (!formulario.nombre || !formulario.correo) return setMensajeFormulario('Completa nombre y correo para crear la cuenta.')
    if (formulario.contrasena !== formulario.confirmar) return setMensajeFormulario('Las contraseñas no coinciden.')
    await crearCuenta({ tipo: tipoCuenta, nombre: formulario.nombre, correo: formulario.correo, contrasena: formulario.contrasena })
    setFormulario({ nombre: '', correo: '', contrasena: '', confirmar: '' })
    setMensajeFormulario('Cuenta creada correctamente en Firebase.')
  }

  return <FormularioAltaCuenta tipoCuenta={tipoCuenta} formulario={formulario} mensajeFormulario={mensajeFormulario} alCambiarTipo={setTipoCuenta} alCambiar={manejarCambio} alLimpiar={() => setFormulario({ nombre: '', correo: '', contrasena: '', confirmar: '' })} alEnviar={manejarEnvio} />
}