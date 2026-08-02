import { useEffect, useState } from 'react'
import { ContextoCarrito } from './contexto_carrito'

export function ProveedorCarrito({ children }) {
  const [carrito, set_carrito] = useState(() => { try { return JSON.parse(localStorage.getItem('genesis_carrito_cliente') || '[]') } catch { return [] } })
  useEffect(() => { localStorage.setItem('genesis_carrito_cliente', JSON.stringify(carrito)) }, [carrito])
  const agregar = (producto, cantidad = 1) => set_carrito((actual) => { const existe = actual.find((item) => item.id === producto.id); if (existe) return actual.map((item) => item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item); return [...actual, { id: producto.id, nombre: producto.nombre, imagen: producto.imagen || '', precio: Number(producto.precio || 0), cantidad }] })
  const ajustar = (id, cambio) => set_carrito((actual) => actual.map((item) => item.id === id ? { ...item, cantidad: Math.max(1, item.cantidad + cambio) } : item))
  const quitar = (id) => set_carrito((actual) => actual.filter((item) => item.id !== id))
  const limpiar = () => set_carrito([])
  return <ContextoCarrito.Provider value={{ carrito, agregar, ajustar, quitar, limpiar }}>{children}</ContextoCarrito.Provider>
}
