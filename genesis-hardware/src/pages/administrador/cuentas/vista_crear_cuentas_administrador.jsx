import { useFormularioAltaCuenta } from '../../../hooks/use_alta_cuenta'
import { FormularioNuevaCuenta } from './formulario_alta_cuenta'

// aqui maestro yo exporto la vista para conectarla con las rutas de la aplicacion
export const VistaCrearCuentasAdministrador = () => {
  // aqui maestro yo paso la logica del hook al formulario hijo
  const { rol, datos, mensaje, cambiarRol, cambiarDato, enviar } = useFormularioAltaCuenta()

  // esto sirve para pintar la vista y mandar las propiedades hacia abajo
  return (
    <div className="p-6">
      <FormularioNuevaCuenta
        rolSeleccionado={rol}
        datos={datos}
        mensaje={mensaje}
        cambiarRol={cambiarRol}
        cambiarDato={cambiarDato}
        enviar={enviar}
      />
    </div>
  )
}
