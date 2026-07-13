export function CampoCorreoCuenta({ valor, alCambiar, rolSeleccionado }) {
    // maestro funciona asi yo pego la etiqueta del dominio al lado del input
    return (
        <div className="flex flex-col">
            <label className="text-sm font-bold mb-2">Correo institucional</label>
            <div className="flex">
                <input
                    type="text"
                    name="correo"
                    value={valor}
                    onChange={alCambiar}
                    placeholder="ej agustinescamilla"
                    className="bg-black border border-gray-800 rounded-l px-3 py-2 text-white focus:outline-none focus:border-red-500 w-full"
                />
                <div className="bg-[#2a2a2a] border border-l-0 border-gray-800 rounded-r px-3 py-2 flex items-center text-gray-400 font-bold select-none">
                    @{rolSeleccionado}.com
                </div>
            </div>
        </div>
    )
}