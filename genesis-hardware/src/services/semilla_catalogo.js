import { addDoc, collection } from 'firebase/firestore'
import { db } from './conexion_firebase'

const coleccionCatalogo = () => collection(db, 'catalogo')

const productosSemilla = [
  { nombre: 'Ryzen 9 7900X', categoria: 'Procesadores', descripcionTecnica: 'Procesador 12 nucleos 24 hilos 4.7GHz max con cache 64MB y soporte PCIe 5.0', descripcionPrecios: 'CPU premium para estaciones de trabajo', stockVisible: 8 },
  { nombre: 'Intel Core i7-14700K', categoria: 'Procesadores', descripcionTecnica: 'Procesador 20 hilos 5.6GHz boost con overclock integrado y grafica UHD 770', descripcionPrecios: 'Rendimiento equilibrado para tareas mixtas', stockVisible: 15 },
  { nombre: 'Corsair Vengeance DDR5 32GB', categoria: 'Memoria RAM', descripcionTecnica: 'Kit 2x16GB 6000MHz CL36 con disipador aluminio y perfil XMP', descripcionPrecios: 'Memoria de alta frecuencia para gaming y render', stockVisible: 20 },
  { nombre: 'Kingston Fury Renegade 64GB', categoria: 'Memoria RAM', descripcionTecnica: 'Kit 2x32GB DDR5 6400MHz con latencia baja y overclock estable', descripcionPrecios: 'Capacidad extrema para produccion', stockVisible: 10 },
  { nombre: 'Nvidia RTX 4080', categoria: 'Tarjetas de video', descripcionTecnica: 'GPU Ada Lovelace 16GB GDDR6X con trazado de rayos y DLSS 3', descripcionPrecios: 'Tarjeta para diseño 3D y juegos AAA', stockVisible: 5 },
  { nombre: 'AMD Radeon RX 7900 XT', categoria: 'Tarjetas de video', descripcionTecnica: 'GPU 20GB GDDR6 con 2da generacion AMD Infinity Cache', descripcionPrecios: 'Potencia máxima para estaciones creativas', stockVisible: 6 },
  { nombre: 'Samsung 990 Pro 2TB', categoria: 'SSD', descripcionTecnica: 'Unidad NVMe PCIe 4.0 con 7450MB/s y durabilidad 1200TBW', descripcionPrecios: 'Almacenamiento ultrarrapido para edicion de video', stockVisible: 12 },
  { nombre: 'Western Digital Blue 4TB', categoria: 'Discos duros', descripcionTecnica: 'HDD 5400RPM 4TB con cache 256MB y gran fiabilidad', descripcionPrecios: 'Almacenamiento masivo para archivos y backups', stockVisible: 18 },
  { nombre: 'Noctua NF-A12x25', categoria: 'Ventiladores', descripcionTecnica: 'Ventilador de 120mm con bajo ruido y flujo de aire optimizado', descripcionPrecios: 'Refrigeracion premium para gabinetes y radiadores', stockVisible: 25 },
  { nombre: 'Cooler Master Hyper 212', categoria: 'Ventiladores', descripcionTecnica: 'Disipador con cuatro heatpipes y ventilador PWM de 120mm', descripcionPrecios: 'Refrigeracion accesible para CPUs de alto rendimiento', stockVisible: 14 },
]

// aqui maestro yo creo un conjunto temporal de productos de hardware para pruebas
export const sembrarCatalogoEjemplo = async () => {
  for (const producto of productosSemilla) {
    await addDoc(coleccionCatalogo(), producto)
  }
}
