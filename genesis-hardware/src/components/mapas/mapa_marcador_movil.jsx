// aqui puse profe el punto animado que representa al repartidor en movimiento
export function MapaMarcadorMovil({ porcentaje_x, porcentaje_y }) {
    return (
        <div
            className="absolute w-3 h-3 rounded-full bg-primario animate-pulse shadow-[0_0_10px_2px_rgba(255,0,0,0.6)]"
            style={{ left: `${porcentaje_x}%`, top: `${porcentaje_y}%` }}
        />
    )
}
