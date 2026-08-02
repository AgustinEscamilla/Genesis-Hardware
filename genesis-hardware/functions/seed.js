import admin from 'firebase-admin'
import { productos_adicionales } from './datos_productos_seed.js'

admin.initializeApp()
const db = admin.firestore()
const productos = [{ id: 'corsair-cx650', sku: 'CP-9020278-EU', nombre: 'Fuente de Poder Corsair CX650', marca: 'Corsair', categoria: 'Fuentes de poder', precio: 1399, stockVisible: 24, imagen: 'https://firstpc-eb569.web.app/assets/corsair-cx650.png', calificacion: 4, opiniones_count: 1, descripcionPrecios: 'Fuente modular de 650 W con certificación 80 PLUS Bronze', descripcionTecnica: 'Alimentación silenciosa y cableado semi modular ordenado', especificaciones: { 'Detalles Técnicos': { MTBF: '100000 h', 'Factor de forma': 'ATX', 'Certificación': '80 PLUS Bronze' }, 'Conectores y Puertos': { 'Conectores SATA': '4', 'Conectores PCIe': '2' }, 'Control de Energía': { 'Potencia total': '650 W', 'Voltaje de entrada': '100 - 240 V' } } }, ...productos_adicionales]

for (const producto of productos) await db.collection('catalogo').doc(producto.id).set(producto)
console.log(`Productos actualizados ${productos.length}`)
