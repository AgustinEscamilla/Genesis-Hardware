import { useState } from 'react'
import { TarjetaProductoCatalogo } from './tarjeta_producto_catalogo'
import { PaginacionProductos } from '../../../components/paginacion_productos'

// pos esto funciona para renderizar todos los productos del catalogo en una grilla responsive
export function ListaCatalogo({ productos, cargando, alSeleccionar, alEliminar }) {
  const [pagina, set_pagina] = useState(1)
  const productos_por_pagina = 10
  const total_paginas = Math.ceil(productos.length / productos_por_pagina)
  const pagina_segura = Math.min(pagina, Math.max(total_paginas, 1))
  const productos_visibles = productos.slice((pagina_segura - 1) * productos_por_pagina, pagina_segura * productos_por_pagina)
  if (cargando) return <p className="text-xs text-mutado">Cargando catalogo...</p>
  if (!productos.length) return <p className="text-xs text-mutado">Sin productos registrados aun</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {productos_visibles.map(p => (
        <TarjetaProductoCatalogo key={p.id} producto={p} alSeleccionar={alSeleccionar} alEliminar={alEliminar} />
      ))}
      <div className="col-span-full"><PaginacionProductos pagina={pagina_segura} total_paginas={total_paginas} al_cambiar={set_pagina} /></div>
    </div>
  )
}
