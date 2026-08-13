import { SelectorRolCuenta } from '../../../components/formularios/selector_rol_cuenta'
import { CampoEntradaCuenta } from '../../../components/formularios/campo_entrada_cuenta'
import { CampoCorreoCuenta } from '../../../components/formularios/campo_correo_cuenta'

export function FormularioNuevaCuenta({ rolSeleccionado, datos, mensaje, cambiarRol, cambiarDato, enviar }) {
    // aqui maestro yo junto los campos para crear cuentas sin mezclar la logica
    return (
        <div className="mx-auto max-w-4xl rounded-md bg-[#1e1e1e] p-6 font-sans text-white">
            <div className="mb-6 flex gap-4">
                <SelectorRolCuenta rol="empleado" seleccionado={rolSeleccionado} alHacerClic={cambiarRol} texto="EMPLEADO" />
                <SelectorRolCuenta rol="repartidor" seleccionado={rolSeleccionado} alHacerClic={cambiarRol} texto="REPARTIDOR" />
            </div>

            <form onSubmit={enviar} className="grid grid-cols-2 gap-6">
                <CampoEntradaCuenta etiqueta="Nombre completo" tipo="text" nombre="nombre" valor={datos.nombre} alCambiar={cambiarDato} />
                <CampoCorreoCuenta valor={datos.correo} alCambiar={cambiarDato} rolSeleccionado={rolSeleccionado} />
                <CampoEntradaCuenta etiqueta="Contraseña temporal" tipo="password" nombre="pass" valor={datos.pass} alCambiar={cambiarDato} />
                <CampoEntradaCuenta etiqueta="Confirmar contraseña" tipo="password" nombre="pass2" valor={datos.pass2} alCambiar={cambiarDato} />

                <div className="col-span-2 mt-2">{mensaje && <p className="font-bold text-yellow-500">{mensaje}</p>}</div>

                <div className="col-span-2 mt-4 flex justify-end gap-4">
                    <button type="submit" className="rounded bg-red-500 px-6 py-2 font-bold text-white hover:bg-red-600">CREAR CUENTA</button>
                </div>
            </form>
        </div>
    )
}
