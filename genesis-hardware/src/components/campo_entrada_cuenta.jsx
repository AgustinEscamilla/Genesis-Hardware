export function CampoEntradaCuenta({ etiqueta, tipo, nombre, valor, alCambiar }) {
    // pos esto funciona para renderizar cualquier input normal del sistema
    return (
        <div className="flex flex-col">
            <label className="text-sm font-bold mb-2">{etiqueta}</label>
            <input
                type={tipo}
                name={nombre}
                value={valor}
                onChange={alCambiar}
                className="bg-fondo/60 border border-borde rounded-lg px-3 py-2 text-texto transition-all duration-200 focus:outline-none focus:border-primario focus:ring-2 focus:ring-primario/30"
            />
        </div>
    )
}