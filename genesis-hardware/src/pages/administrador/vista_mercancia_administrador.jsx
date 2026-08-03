import { FormularioIngresoMercancia } from './formulario_ingreso_mercancia'
import { useInventario } from '../../hooks/use_inventario'
import { SeccionInventario } from './seccion_inventario'

// aqui maestro yo uno el hook de inventario con el formulario y paso los datos como props
export function VistaMercanciaAdministrador() {
  const { forma, catalogo, cambiar, enviar, guardando, mensaje } = useInventario()

  return (
    <div className="min-h-screen bg-fondo p-6 flex flex-col gap-6">
      <h2 className="text-xs uppercase tracking-widest text-primario">Ingreso de mercancia</h2>
      <FormularioIngresoMercancia
        forma={forma}
        catalogo={catalogo}
        cambiar={cambiar}
        enviar={enviar}
        guardando={guardando}
        mensaje={mensaje}
      />
      <SeccionInventario />
    </div>
  )
}
