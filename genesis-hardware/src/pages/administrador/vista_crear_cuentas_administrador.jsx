import { useFormularioAltaCuenta } from '../../hooks/useAltaCuenta'
import { FormularioNuevaCuenta } from './FormularioAltaCuenta'

// Le agregamos el 'export' directo a la constante para que coincida con las llaves de App.jsx
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