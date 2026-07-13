// esto sirve yo muestro la tarjeta visual de cada producto para cliente
export function ClienteTarjetaCatalogo({ producto, alAgregar }) {
  const stock = Number(producto.stockVisible || 0)
  const critico = stock < 5

  return (
    <div className="border border-borde bg-panel p-3 flex flex-col gap-3">
      <p className="text-[10px] text-mutado">Codigo {producto.id?.slice(0, 8)}</p>
      <p className={`text-xs ${critico ? 'text-primario' : 'text-[#d8b4fe]'}`}>{critico ? 'STOCK BAJO' : 'EN STOCK'}</p>
      {producto.imagen ? <img src={producto.imagen} alt={producto.nombre} className="h-28 w-full object-cover" /> : <div className="h-28 border border-borde bg-fondo" />}
      <p className="text-2xl font-bold text-texto">{producto.nombre}</p>
      <p className="text-xs text-mutado">Stock disponible {stock}</p>
      <div className="mt-auto flex justify-between items-center pt-2 border-t border-borde">
        <p className="text-xl text-[#fca5a5]">$ {producto.precio || '0.00'}</p>
        <button onClick={() => alAgregar(producto)} className="border border-[#d8b4fe] text-[#d8b4fe] px-4 py-1 text-xs hover:bg-[#d8b4fe] hover:text-fondo">AGREGAR</button>
      </div>
    </div>
  )
}
