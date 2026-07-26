// aqui puse profe yo muestro el total a pagar antes de abrir el formulario de mercado pago
export function TarjetaResumenPago({ total }) {
  return (
    <div className="border border-borde bg-fondo rounded p-3 flex justify-between items-center">
      <p className="text-xs text-mutado uppercase tracking-widest">Total a pagar</p>
      <p className="text-lg font-bold text-primario">${total.toFixed(2)}</p>
    </div>
  )
}
