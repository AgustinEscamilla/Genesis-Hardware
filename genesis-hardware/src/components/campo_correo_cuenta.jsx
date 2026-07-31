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
                    className="bg-fondo/60 border border-borde rounded-l-lg px-3 py-2 text-texto transition-all duration-200 focus:outline-none focus:border-primario focus:ring-2 focus:ring-primario/30 w-full"
                />
                <div className="bg-panel border border-l-0 border-borde rounded-r-lg px-3 py-2 flex items-center text-mutado font-bold select-none">
                    @{rolSeleccionado}.com
                </div>
            </div>
        </div>
    )
}