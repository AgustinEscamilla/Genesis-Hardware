import { useAltaCuenta } from '../../hooks/useAltaCuenta'
import FormularioAltaCuenta from './FormularioAltaCuenta'

// Le agregamos el 'export' directo a la constante para que coincida con las llaves de tu App.jsx
export const VistaCrearCuentasAdministrador = () => {
  // aqui maestro yo traigo la logica del hook para pasarsela al hijo
  const { rol, datos, mensaje, cambiarRol, cambiarDato, enviar } = useAltaCuenta()

  // esto sirve para pintar la vista y mandar las propiedades hacia abajo
  return (
    <div className="p-6">
      <FormularioAltaCuenta
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