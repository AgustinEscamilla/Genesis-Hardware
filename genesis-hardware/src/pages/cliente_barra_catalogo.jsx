import { Link } from 'react-router-dom'
import { BotonSalida } from '../components/boton_salida'
import { CampanaNotificaciones } from '../components/campana_notificaciones'
import { ZONAS_LOGISTICAS } from '../services/servicio_pedidos'

// aqui maestro yo arme la barra superior del catalogo de cliente
export function ClienteBarraCatalogo({ alAbrirCarrito, total, zonaLogistica, alCambiarZona, notificaciones, alMarcarLeida }) {
  return (
    <header className="flex flex-wrap items-center gap-3 border-b border-borde bg-panel px-4 py-3 md:px-6">
      <p className="mr-auto text-sm font-black tracking-[0.2em] text-primario">GENESIS HARDWARE</p>
      <select value={zonaLogistica} onChange={(e) => alCambiarZona(e.target.value)} className="border border-borde bg-fondo px-3 py-2 text-xs text-texto focus:outline-none focus:ring-2 focus:ring-primario">
        {ZONAS_LOGISTICAS.map((zona) => <option key={zona} value={zona}>{zona}</option>)}
      </select>
      <nav className="flex flex-wrap items-center justify-end gap-2 text-xs text-mutado">
        <span className="hidden border-b border-primario pb-1 text-texto sm:inline">Catalogo</span>
        <button type="button" onClick={alAbrirCarrito} className="border border-primario px-3 py-2 text-primario transition-colors hover:bg-primario hover:text-fondo">
          Carrito {total}
        </button>
        <Link to="/clientes/ajustes" className="flex items-center gap-2 border border-borde px-3 py-2 text-xs text-texto transition-colors hover:bg-fondo">
          <span aria-hidden="true">⚙️</span>
          Ajustes
        </Link>
        <CampanaNotificaciones notificaciones={notificaciones} alMarcarLeida={alMarcarLeida} />
        <BotonSalida />
      </nav>
    </header>
  )
}
