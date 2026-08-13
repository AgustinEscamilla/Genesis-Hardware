import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCatalogoPublico } from '../../hooks/use_catalogo_publico'
import { useAutenticacion } from '../../hooks/use_autenticacion.jsx'
import { useCarritoPedidos } from '../../hooks/use_carrito_pedidos'
import { use_modal_carrito } from '../../hooks/use_modal_carrito'
import { CabeceraFirstpc } from '../../components/navegacion/cabecera_firstpc'
import { BotonSalida } from '../../components/formularios/boton_salida'
import { GaleriaProductoFirstpc } from '../../components/catalogo/galeria_producto_firstpc'
import { ResumenProductoFirstpc } from '../../components/catalogo/resumen_producto_firstpc'
import { FichaTecnica } from '../../components/catalogo/FichaTecnica'
import { adaptarEspecificacionesProducto } from '../../services/adaptar_especificaciones_producto'
import { ClienteModalCarrito } from '../cliente_modal_carrito'

export function VistaDetalleProductoFirstpc() {
  const { id } = useParams(); const { productos, cargando } = useCatalogoPublico(); const { usuarioActual } = useAutenticacion(); const carrito = useCarritoPedidos('cliente')
  const modal_carrito = use_modal_carrito()
  const producto = productos.find((item) => item.id === id); const [cantidad, set_cantidad] = useState(1); const [mensaje, set_mensaje] = useState('')
  const ruta_catalogo = usuarioActual ? '/clientes' : '/componentes'
  if (cargando) return <p className="min-h-screen bg-fondo p-10 text-mutado">Cargando producto...</p>
  if (!producto) return <div className="min-h-screen bg-fondo p-10 text-mutado"><p>Producto no encontrado</p><Link to={ruta_catalogo} className="mt-4 inline-block text-primario">Volver al catalogo</Link></div>
  const al_agregar = () => { carrito.agregar(producto, cantidad); set_mensaje('Producto agregado al carrito') }
  const al_requerir_sesion = () => set_mensaje('Es necesario iniciar sesion para agregar producto en el carrito de compra')
  const total_carrito = carrito.carrito.reduce((total, item) => total + item.cantidad, 0)
  return <div className="min-h-screen bg-fondo text-texto"><CabeceraFirstpc carrito={total_carrito} al_abrir_carrito={usuarioActual ? modal_carrito.alternar : al_requerir_sesion} autenticado={Boolean(usuarioActual)} acciones_extra={usuarioActual ? <BotonSalida /> : null} /><main className="mx-auto max-w-6xl px-4 py-8"><Link to={ruta_catalogo} className="mb-5 inline-block text-xs font-bold text-mutado">← Volver a componentes</Link><div className="grid gap-8 lg:grid-cols-2"><GaleriaProductoFirstpc producto={producto} /><ResumenProductoFirstpc producto={producto} cantidad={cantidad} set_cantidad={set_cantidad} al_agregar={usuarioActual ? al_agregar : al_requerir_sesion} autenticado={Boolean(usuarioActual)} mensaje={mensaje} /></div><section className="mt-8 rounded-xl border border-borde bg-panel p-6"><p className="text-[10px] font-black tracking-widest text-primario">CONOCE CADA DETALLE</p><h2 className="mt-2 text-xl font-black">{producto.descripcionPrecios || 'Rendimiento preparado para tu próximo equipo'}</h2><p className="mt-3 text-sm leading-6 text-mutado">{producto.descripcionTecnica || 'Consulta las especificaciones del componente.'}</p></section><div className="mt-8"><FichaTecnica especificaciones_tecnicas={adaptarEspecificacionesProducto(producto)} /></div></main>{usuarioActual && <ClienteModalCarrito modal_carrito={modal_carrito} carrito={carrito} />}</div>
}
