import BotonRol from '../../components/BotonRol'
import CampoEntrada from '../../components/CampoEntrada'
import CampoCorreo from '../../components/CampoCorreo'

const FormularioAltaCuenta = ({ rolSeleccionado, datos, mensaje, cambiarRol, cambiarDato, enviar }) => {
    // aqui puse profe el cascaron que junta todos los componentes chiquitos
    return (
        <div className="bg-[#1e1e1e] p-6 rounded-md text-white font-sans max-w-4xl mx-auto">
            <div className="flex gap-4 mb-6">
                <BotonRol rol="empleado" seleccionado={rolSeleccionado} alHacerClic={cambiarRol} texto="EMPLEADO" />
                <BotonRol rol="repartidor" seleccionado={rolSeleccionado} alHacerClic={cambiarRol} texto="REPARTIDOR" />
            </div>

            <form onSubmit={enviar} className="grid grid-cols-2 gap-6">
                <CampoEntrada etiqueta="Nombre completo" tipo="text" nombre="nombre" valor={datos.nombre} alCambiar={cambiarDato} />
                <CampoCorreo valor={datos.correo} alCambiar={cambiarDato} rolSeleccionado={rolSeleccionado} />
                <CampoEntrada etiqueta="Contraseña temporal" tipo="password" nombre="pass" valor={datos.pass} alCambiar={cambiarDato} />
                <CampoEntrada etiqueta="Confirmar contraseña" tipo="password" nombre="pass2" valor={datos.pass2} alCambiar={cambiarDato} />

                <div className="col-span-2 mt-2">
                    {mensaje && <p className="text-yellow-500 font-bold">{mensaje}</p>}
                </div>

                <div className="col-span-2 flex justify-end gap-4 mt-4">
                    <button type="submit" className="px-6 py-2 bg-red-500 rounded text-white font-bold hover:bg-red-600">CREAR CUENTA</button>
                </div>
            </form>
        </div>
    )
}

export default FormularioAltaCuenta