import { Link } from 'react-router-dom'
import { BotonSalida } from '../components/boton_salida'
import { CampanaNotificaciones } from '../components/campana_notificaciones'
import { ZONAS_LOGISTICAS } from '../services/servicio_pedidos'

// aqui maestro yo arme la barra superior del catalogo de cliente
export function ClienteBarraCatalogo({ alAbrirCarrito, total, zonaLogistica, alCambiarZona, notificaciones, alMarcarLeida }) {
  return (
    <header className="h-16 border-b border-borde bg-panel px-4 flex items-center gap-4">
      <p className="text-primario font-black tracking-wide">CORE SYNC INDUSTRIAL</p>
      <input className="ml-2 w-80 bg-fondo border border-borde text-texto px-3 py-2 text-xs" placeholder="Buscar en catalogo..." />
      <select value={zonaLogistica} onChange={(e) => alCambiarZona(e.target.value)} className="bg-fondo border border-borde text-texto px-3 py-2 text-xs">
        {ZONAS_LOGISTICAS.map((zona) => <option key={zona} value={zona}>{zona}</option>)}
      </select>
      <nav className="ml-auto flex items-center gap-4 text-xs text-mutado">
        <span>Tablero</span>
        <span className="text-texto border-b border-primario pb-1">Catalogo</span>
        <button onClick={alAbrirCarrito} className="border border-primario text-primario px-3 py-2 hover:bg-primario hover:text-fondo transition-colors">
          Carrito {total}
        </button>
        <Link to="/clientes/ajustes" className="border border-borde text-texto px-3 py-2 text-xs hover:bg-panel transition-colors flex items-center gap-2">
          <span aria-hidden="true">⚙️</span>
          Ajustes
        </Link>
        <CampanaNotificaciones notificaciones={notificaciones} alMarcarLeida={alMarcarLeida} />
        <BotonSalida />
      </nav>
    </header>
  )
}
