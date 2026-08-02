import { plantillaEspecificacionesVideo } from './plantillas_especificaciones_tecnicas'

export const productos_video = [
  {
    nombre: 'NVIDIA RTX 4090',
    categoria: 'Tarjetas de video',
    descripcionTecnica: 'GPU Ada Lovelace 24GB GDDR6X 16384 CUDA cores TGP 450W PCIe 4.0 DLSS 3 con Frame Generation',
    descripcionPrecios: 'Maximo rendimiento para gaming 4K render profesional e IA La tarjeta mas potente del mercado',
    stockVisible: 8,
    precio: 32999,
    imagen: 'https://via.placeholder.com/400x300?text=RTX+4090',
    especificaciones_tecnicas: plantillaEspecificacionesVideo({ memoria_video: '24 GB GDDR6X', factor_forma: 'ATX de doble/triple slot', temperatura: '0°C a 90°C', interfaz: 'PCIe 4.0 x16', ancho: '304 mm', peso: '2200 g', profundidad: '137 mm', altura: '61 mm', componente_para: 'Gaming 4K y render profesional', tgp: '450 W', ray_tracing: 'Ray Tracing 3ra gen con DLSS 3', velocidad_reloj: '2520 MHz boost' })
  },
  {
    nombre: 'NVIDIA RTX 4080 SUPER',
    categoria: 'Tarjetas de video',
    descripcionTecnica: 'GPU Ada 16GB GDDR6X 10240 CUDA cores 320-bit TGP 320W Ray Tracing y Tensor cores',
    descripcionPrecios: 'Ideal para gaming 1440p ultra y workstations 3D Excelente relacion precio rendimiento',
    stockVisible: 12,
    precio: 22999,
    imagen: 'https://via.placeholder.com/400x300?text=RTX+4080',
    especificaciones_tecnicas: plantillaEspecificacionesVideo({ memoria_video: '16 GB GDDR6X', factor_forma: 'ATX de doble/triple slot', temperatura: '0°C a 90°C', interfaz: 'PCIe 4.0 x16', ancho: '304 mm', peso: '1800 g', profundidad: '137 mm', altura: '61 mm', componente_para: 'Gaming 1440p ultra y 3D', tgp: '320 W', ray_tracing: 'Ray Tracing y Tensor cores', velocidad_reloj: '2550 MHz boost' })
  },
  {
    nombre: 'NVIDIA RTX 4070 Ti',
    categoria: 'Tarjetas de video',
    descripcionTecnica: 'GPU Ada 12GB GDDR6X 7680 CUDA cores 192-bit TGP 285W DLSS 3 arquitectura eficiente',
    descripcionPrecios: 'Gaming 1440p alto Perfecta para creadores de contenido 3D con presupuesto moderado',
    stockVisible: 18,
    precio: 15999,
    imagen: 'https://via.placeholder.com/400x300?text=RTX+4070',
    especificaciones_tecnicas: plantillaEspecificacionesVideo({ memoria_video: '12 GB GDDR6X', factor_forma: 'ATX de doble slot', temperatura: '0°C a 90°C', interfaz: 'PCIe 4.0 x16', ancho: '267 mm', peso: '1400 g', profundidad: '120 mm', altura: '50 mm', componente_para: 'Gaming 1440p alto', tgp: '285 W', ray_tracing: 'DLSS 3 con Frame Generation', velocidad_reloj: '2610 MHz boost' })
  },
]
