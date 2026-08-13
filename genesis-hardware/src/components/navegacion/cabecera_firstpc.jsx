import { Link } from 'react-router-dom'

export function CabeceraFirstpc({ carrito, al_abrir_carrito = () => { }, acciones_extra = null, autenticado = false, mostrar_carrito = true }) {
  const ruta_catalogo = autenticado ? '/clientes' : '/componentes'

  return (
    <header className="sticky top-0 z-30 border-b border-borde bg-fondo/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
        <Link to={ruta_catalogo} className="flex items-center gap-3 text-texto">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-panel text-xl text-primario">▣</span>
          <span className="text-xl font-black tracking-tight texto-degradado">GENESIS HARDWARE</span>
        </Link>

        <nav className="flex flex-wrap items-center gap-2 overflow-x-auto text-xs font-semibold text-mutado sm:gap-4 md:text-sm">
          <Link to={ruta_catalogo} className="rounded-lg px-2 py-1.5 text-texto transition-colors hover:text-primario">Catalogo</Link>
          {autenticado && <Link to="/clientes/pedidos" className="rounded-lg px-2 py-1.5 transition-colors hover:text-texto">Pedidos</Link>}
          {autenticado && <Link to="/clientes/ajustes" className="rounded-lg px-2 py-1.5 transition-colors hover:text-texto">Perfil</Link>}
          {autenticado && <Link to="/clientes/reclamos" className="rounded-lg px-2 py-1.5 transition-colors hover:text-texto">Reportes</Link>}
        </nav>

        <div className="flex items-center justify-end gap-3">
          {mostrar_carrito && (
            <button onClick={al_abrir_carrito} className="relative rounded-full p-2 text-texto" aria-label="Carrito">
              🛒
              {carrito > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primario px-1 text-[10px] font-bold text-fondo">{carrito}</span>}
            </button>
          )}
          {acciones_extra || <Link to="/" className="rounded-lg bg-degradado-primario px-4 py-2 text-xs font-bold text-fondo">Iniciar sesion</Link>}
        </div>
      </div>
    </header>
  )
}
