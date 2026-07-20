import { FormularioIngresoMercancia } from '../../pages/administrador/formulario_ingreso_mercancia'
import { useInventario } from '../../hooks/use_inventario'

// esto sirve para que el empleado registre llegada de mercancia al almacen
export function VistaRecepcionEmpleado() {
  const { forma, cambiar, enviar, guardando, mensaje } = useInventario()

  return (
    <div className="min-h-screen bg-fondo p-6 text-texto">
      <div className="bg-panel border border-borde p-6 rounded-lg max-w-lg">
        <h2 className="text-xl font-bold mb-3">Recepcion de productos</h2>
        <FormularioIngresoMercancia forma={forma} cambiar={cambiar} enviar={enviar} guardando={guardando} mensaje={mensaje} />
      </div>
    </div>
  )
}
