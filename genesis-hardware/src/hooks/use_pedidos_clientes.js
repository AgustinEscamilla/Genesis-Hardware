import { useEffect, useMemo, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../services/conexion_firebase'
import { escucharUsuarios } from '../services/servicio_usuarios'

// aqui maestro yo combino pedidos con datos del cliente para el empleado
export function usePedidosClientes() {
  const [pedidos, setPedidos] = useState([])
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => onSnapshot(collection(db, 'pedidos'), (snap) => setPedidos(snap.docs.map((d) => ({ id: d.id, ...d.data() })))), [])
  useEffect(() => escucharUsuarios(setUsuarios), [])

  const clientesPorId = useMemo(() => {
    return usuarios.reduce((acc, usuario) => ({ ...acc, [usuario.uidAuth || usuario.id]: usuario }), {})
  }, [usuarios])

  const pedidosConCliente = pedidos.map((pedido) => ({
    ...pedido,
    cliente: clientesPorId[pedido.clienteId] || null
  }))

  return { pedidosConCliente }
}
