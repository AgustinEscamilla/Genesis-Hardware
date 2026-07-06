const CampoEntrada = ({ etiqueta, tipo, nombre, valor, alCambiar }) => {
    // pos esto funciona para renderizar cualquier input normal del sistema
    return (
        <div className="flex flex-col">
            <label className="text-sm font-bold mb-2">{etiqueta}</label>
            <input
                type={tipo}
                name={nombre}
                value={valor}
                onChange={alCambiar}
                className="bg-black border border-gray-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
            />
        </div>
    )
}

export default CampoEntrada