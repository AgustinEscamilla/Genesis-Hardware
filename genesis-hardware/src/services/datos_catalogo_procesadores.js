import { plantillaEspecificacionesProcesador } from './plantillas_especificaciones_tecnicas'

export const productos_procesadores = [
  {
    nombre: 'Intel Core i9-14900KS',
    categoria: 'Procesadores',
    descripcionTecnica: '24 nucleos 8 P-core y 16 E-core hasta 6.2 GHz 36 MB cache L3 Socket LGA1700 TDP 150W',
    descripcionPrecios: 'CPU mas rapida de Intel Rendimiento absoluto para gaming y workstations de elite',
    stockVisible: 6,
    precio: 13999,
    imagen: 'https://via.placeholder.com/400x300?text=Intel+i9',
    especificaciones_tecnicas: plantillaEspecificacionesProcesador({ nucleos: '24 nucleos (8P+16E) 32 hilos', factor_forma: 'BGA/LGA', temperatura: '0°C a 100°C', socket: 'LGA1700', ancho: '37.5 mm', peso: '35 g', profundidad: '37.5 mm', altura: '3.9 mm', componente_para: 'Gaming extremo y workstations', frecuencia_base: '3.2 GHz', frecuencia_turbo: '6.2 GHz', tdp: '150 W' })
  },
  {
    nombre: 'AMD Ryzen 9 7950X3D',
    categoria: 'Procesadores',
    descripcionTecnica: '16 nucleos 32 hilos hasta 5.7 GHz 144 MB cache 3D V-Cache Socket AM5 TDP 162W',
    descripcionPrecios: 'Campeon en gaming con V-Cache Mejor opcion AMD para gaming competitivo',
    stockVisible: 8,
    precio: 14999,
    imagen: 'https://via.placeholder.com/400x300?text=Ryzen+9',
    especificaciones_tecnicas: plantillaEspecificacionesProcesador({ nucleos: '16 nucleos 32 hilos', factor_forma: 'PGA', temperatura: '0°C a 89°C', socket: 'AM5', ancho: '40 mm', peso: '32 g', profundidad: '40 mm', altura: '3.5 mm', componente_para: 'Gaming competitivo con V-Cache', frecuencia_base: '4.2 GHz', frecuencia_turbo: '5.7 GHz', tdp: '120 W' })
  },
]
