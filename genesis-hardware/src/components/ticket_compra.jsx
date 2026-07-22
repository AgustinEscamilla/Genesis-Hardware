// esto sirve para mostrar el recibo real despues de confirmar el pago
export function TicketCompra({ ticket, al_cerrar }) {
    return (
        <div className="border border-primario bg-fondo p-3 flex flex-col gap-2 text-xs text-texto">
            <p className="text-primario font-bold text-sm">Pedido confirmado</p>
            <p className="text-mutado">Folio {ticket.folio.slice(0, 10)}</p>
            <p className="text-mutado">{new Date(ticket.fecha).toLocaleString()}</p>
            <div className="border-t border-borde pt-2 flex flex-col gap-1">
                {ticket.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                        <span>{item.nombre} x{item.cantidad}</span>
                        <span>$ {(item.precio * item.cantidad).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="border-t border-borde pt-2 flex justify-between font-bold text-primario">
                <span>Total</span>
                <span>$ {ticket.total.toFixed(2)}</span>
            </div>
            <button onClick={al_cerrar} className="mt-2 border border-borde py-2 hover:border-primario">Cerrar</button>
        </div>
    )
}
