import { TarjetaParadaRuta } from './tarjeta_parada_ruta'

// maestro funciona asi yo listo todas las paradas ya ordenadas de la ruta
export function ListaParadasRuta({ paradas }) {
    return (
        <div className="flex flex-col gap-2">
            {paradas.map((parada) => <TarjetaParadaRuta key={parada.pedido.id} parada={parada} />)}
            {!paradas.length && <p className="text-xs text-mutado">No hay pedidos liberados por el almacen todavia</p>}
        </div>
    )
}
