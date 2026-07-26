import { ListaItemsCarrito } from './lista_items_carrito'
import { TicketCompra } from './ticket_compra'
import { PanelPagoMercadoPago } from './pago/panel_pago_mercadopago'

// maestro funciona asi yo muestro el modal completo del carrito con su checkout
export function ModalCarrito({
    abierto, carrito, al_ajustar, al_quitar, al_ir_a_pagar, al_confirmar, guardando,
    mensaje, al_cerrar, ticket, al_cerrar_ticket, paso, total, al_volver_carrito
}) {
    if (!abierto) return null

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-panel border border-borde w-96 p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <p className="text-texto font-bold">Mi carrito</p>
                    <button onClick={al_cerrar} className="text-mutado hover:text-texto">Cerrar</button>
                </div>
                {ticket ? (
                    <TicketCompra ticket={ticket} al_cerrar={al_cerrar_ticket} />
                ) : paso === 'pago' ? (
                    <PanelPagoMercadoPago total={total} alExito={al_confirmar} alVolver={al_volver_carrito} />
                ) : (
                    <>
                        <ListaItemsCarrito carrito={carrito} al_ajustar={al_ajustar} al_quitar={al_quitar} />
                        {mensaje && <p className="text-xs text-primario">{mensaje}</p>}
                        <button
                            onClick={al_ir_a_pagar}
                            disabled={!carrito.length || guardando}
                            className="border border-primario text-primario py-2 text-xs hover:bg-primario hover:text-fondo disabled:opacity-30"
                        >
                            {guardando ? 'Procesando...' : 'Comenzar proceso de pago'}
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
