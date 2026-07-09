export function BotonGoogleCliente({ alIniciarSesion, cargando }) {
  // aqui maestro yo solo dibujo el boton y recibo la accion desde el padre
  return <button type="button" disabled={cargando} onClick={alIniciarSesion} className="w-full border border-borde bg-panel px-4 py-3 text-sm font-semibold text-texto transition hover:border-primario hover:text-primario disabled:cursor-not-allowed disabled:opacity-60">{cargando ? 'Conectando con Google' : 'Entrar con Google'}</button>
}