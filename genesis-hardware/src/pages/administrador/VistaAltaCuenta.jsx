import { useAltaCuenta } from '../../hooks/useAltaCuenta'
import FormularioAltaCuenta from './FormularioAltaCuenta'

const VistaAltaCuenta = () => {
    // aqui maestro yo traigo la logica del hook para pasarsela al hijo
    const { rol, datos, cambiarRol, cambiarDato, enviar } = useAltaCuenta()

    // esto sirve para pintar la vista y mandar las propiedades hacia abajo
    return (
        <div className="p-6">
            <FormularioAltaCuenta
                rolSeleccionado={rol}
                datos={datos}
                cambiarRol={cambiarRol}
                cambiarDato={cambiarDato}
                enviar={enviar}
            />
        </div>
    )
}

export default VistaAltaCuenta