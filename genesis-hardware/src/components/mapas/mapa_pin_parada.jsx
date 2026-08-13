// aqui puse profe yo dibujo un pin fijo con el numero de la parada correspondiente
export function MapaPinParada({ porcentaje_x, porcentaje_y, numero }) {
    return (
        <div
            className="absolute flex items-center justify-center w-5 h-5 rounded-full bg-primario text-fondo text-[10px] font-bold border border-fondo shadow-[0_0_8px_1px_rgba(255,0,0,0.5)] -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${porcentaje_x}%`, top: `${porcentaje_y}%` }}
        >
            {numero}
        </div>
    )
}
