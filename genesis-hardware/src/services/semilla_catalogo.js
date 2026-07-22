import { addDoc, collection, deleteDoc, getDocs } from 'firebase/firestore'
import { db } from './conexion_firebase'

const coleccionCatalogo = () => collection(db, 'catalogo')

const productosSemilla = [
  // TARJETAS DE VIDEO
  {
    nombre: 'NVIDIA RTX 4090',
    categoria: 'Tarjetas de video',
    descripcionTecnica: 'GPU Ada Lovelace 24GB GDDR6X, 16384 CUDA cores, TGP 450W, PCIe 4.0, DLSS 3 con Frame Generation',
    descripcionPrecios: 'Máximo rendimiento para gaming 4K, render profesional y IA. La tarjeta más potente del mercado.',
    stockVisible: 8,
    precio: 32999,
    imagen: 'https://via.placeholder.com/400x300?text=RTX+4090'
  },
  {
    nombre: 'NVIDIA RTX 4080 SUPER',
    categoria: 'Tarjetas de video',
    descripcionTecnica: 'GPU Ada 16GB GDDR6X, 10240 CUDA cores, 320-bit, TGP 320W, Ray Tracing y Tensor cores',
    descripcionPrecios: 'Ideal para gaming 1440p ultra y workstations 3D. Excelente relación precio-rendimiento.',
    stockVisible: 12,
    precio: 22999,
    imagen: 'https://via.placeholder.com/400x300?text=RTX+4080'
  },
  {
    nombre: 'NVIDIA RTX 4070 Ti',
    categoria: 'Tarjetas de video',
    descripcionTecnica: 'GPU Ada 12GB GDDR6X, 7680 CUDA cores, 192-bit, TGP 285W, DLSS 3, arquitectura eficiente',
    descripcionPrecios: 'Gaming 1440p alto. Perfecta para creadores de contenido 3D con presupuesto moderado.',
    stockVisible: 18,
    precio: 15999,
    imagen: 'https://via.placeholder.com/400x300?text=RTX+4070'
  },
  {
    nombre: 'AMD Radeon RX 7900 XTX',
    categoria: 'Tarjetas de video',
    descripcionTecnica: 'GPU RDNA 3, 24GB GDDR6, 6144 stream processors, 384-bit, TGP 500W, Ray Tracing mejorado',
    descripcionPrecios: 'Competencia directa con RTX 4090. Excelente en gaming y renderizado profesional.',
    stockVisible: 10,
    precio: 21999,
    imagen: 'https://via.placeholder.com/400x300?text=RX+7900'
  },
  {
    nombre: 'AMD Radeon RX 7900 XT',
    categoria: 'Tarjetas de video',
    descripcionTecnica: 'GPU RDNA 3, 20GB GDDR6, 5120 stream processors, 320-bit, TGP 420W, eficiencia mejorada',
    descripcionPrecios: 'Gaming 4K a buen precio. Gran valor para gamers que buscan RTX 4080 alternativa.',
    stockVisible: 15,
    precio: 17999,
    imagen: 'https://via.placeholder.com/400x300?text=RX+7900+XT'
  },
  {
    nombre: 'NVIDIA RTX 4060 Ti',
    categoria: 'Tarjetas de video',
    descripcionTecnica: 'GPU Ada 8GB GDDR6, 4352 CUDA cores, 128-bit, TGP 130W, bajo consumo, PCIe 4.0',
    descripcionPrecios: 'Presupuesto gaming 1080p. Excelente para gaming casual y eSports con bajo calor.',
    stockVisible: 25,
    precio: 8999,
    imagen: 'https://via.placeholder.com/400x300?text=RTX+4060'
  },

  // PROCESADORES
  {
    nombre: 'Intel Core i9-14900KS',
    categoria: 'Procesadores',
    descripcionTecnica: '24 núcleos (8 P-core + 16 E-core), hasta 6.2 GHz, 36 MB cache L3, Socket LGA1700, TDP 150W',
    descripcionPrecios: 'CPU más rápida de Intel. Rendimiento absoluto para gaming y workstations de élite.',
    stockVisible: 6,
    precio: 13999,
    imagen: 'https://via.placeholder.com/400x300?text=Intel+i9'
  },
  {
    nombre: 'AMD Ryzen 9 7950X3D',
    categoria: 'Procesadores',
    descripcionTecnica: '16 núcleos 32 hilos, hasta 5.7 GHz, 144 MB cache 3D V-Cache, Socket AM5, TDP 162W',
    descripcionPrecios: 'Campeón en gaming con V-Cache. Mejor opción AMD para gaming competitivo.',
    stockVisible: 8,
    precio: 14999,
    imagen: 'https://via.placeholder.com/400x300?text=Ryzen+9'
  },
  {
    nombre: 'Intel Core i7-14700K',
    categoria: 'Procesadores',
    descripcionTecnica: '20 núcleos (8 P-core + 12 E-core), hasta 5.6 GHz, 33 MB cache, Socket LGA1700, TDP 125W',
    descripcionPrecios: 'CPU equilibrada. Gaming y contenido profesional a precio accesible.',
    stockVisible: 14,
    precio: 8999,
    imagen: 'https://via.placeholder.com/400x300?text=Intel+i7'
  },
  {
    nombre: 'AMD Ryzen 7 7700X',
    categoria: 'Procesadores',
    descripcionTecnica: '8 núcleos 16 hilos, hasta 5.4 GHz, 32 MB cache L3, Socket AM5, TDP 105W',
    descripcionPrecios: 'Gaming puro a 1440p. Excelente relación precio-rendimiento para gamers.',
    stockVisible: 12,
    precio: 7499,
    imagen: 'https://via.placeholder.com/400x300?text=Ryzen+7'
  },
  {
    nombre: 'Intel Core i5-14600K',
    categoria: 'Procesadores',
    descripcionTecnica: '14 núcleos (6 P-core + 8 E-core), hasta 5.3 GHz, 24 MB cache, Socket LGA1700, TDP 125W',
    descripcionPrecios: 'Entry-level gaming. Perfecta para gamers presupuestarios en 1080p.',
    stockVisible: 20,
    precio: 5999,
    imagen: 'https://via.placeholder.com/400x300?text=Intel+i5'
  },
  {
    nombre: 'AMD Ryzen 5 5600X',
    categoria: 'Procesadores',
    descripcionTecnica: '6 núcleos 12 hilos, hasta 4.6 GHz, 35 MB cache, Socket AM4, TDP 65W, arquitectura anterior',
    descripcionPrecios: 'Budget gaming retro. Buen CPU para builds económicas 1080p estable.',
    stockVisible: 18,
    precio: 3499,
    imagen: 'https://via.placeholder.com/400x300?text=Ryzen+5'
  },

  // MEMORIAS RAM
  {
    nombre: 'Corsair Dominator Titanium 96GB DDR5',
    categoria: 'Memoria RAM',
    descripcionTecnica: 'Kit 2x48GB DDR5-6000 CL30, RGB iluminado, dissipador de aluminio, Intel XMP 3.0',
    descripcionPrecios: 'Memoria extrema para streaming + gaming + render. Capacidad profesional.',
    stockVisible: 5,
    precio: 9999,
    imagen: 'https://via.placeholder.com/400x300?text=DDR5+96GB'
  },
  {
    nombre: 'G.SKILL Trident Z5 64GB DDR5',
    categoria: 'Memoria RAM',
    descripcionTecnica: 'Kit 2x32GB DDR5-6400 CL32, RGB Trident, low profile, Intel/AMD compatible',
    descripcionPrecios: 'RAM de alta frecuencia para workstations. Excelente estabilidad en overclock.',
    stockVisible: 10,
    precio: 6999,
    imagen: 'https://via.placeholder.com/400x300?text=DDR5+64GB'
  },
  {
    nombre: 'Kingston Fury Beast 32GB DDR5',
    categoria: 'Memoria RAM',
    descripcionTecnica: 'Kit 2x16GB DDR5-6000 CL30, disipador negro mate, perfil bajo, JEDEC estable',
    descripcionPrecios: 'RAM confiable para gaming. Kingston Fury es conocida por durabilidad.',
    stockVisible: 18,
    precio: 2799,
    imagen: 'https://via.placeholder.com/400x300?text=Kingston+32GB'
  },
  {
    nombre: 'Corsair Vengeance DDR5 32GB',
    categoria: 'Memoria RAM',
    descripcionTecnica: 'Kit 2x16GB DDR5-5600 CL28, disipador compacto, bajo perfil, XMP 3.0',
    descripcionPrecios: 'RAM presupuestaria DDR5. Perfecta para builds gaming económicos.',
    stockVisible: 22,
    precio: 2399,
    imagen: 'https://via.placeholder.com/400x300?text=Corsair+RAM'
  },
  {
    nombre: 'ADATA XPG Spectrix D35 16GB DDR4',
    categoria: 'Memoria RAM',
    descripcionTecnica: 'Kit 2x8GB DDR4-3600 CL18, RGB Spectrix, disipador aluminio, Intel/AMD compatible',
    descripcionPrecios: 'RAM DDR4 RGB para gaming retro. Compatible con builds AM4 antiguos.',
    stockVisible: 16,
    precio: 1299,
    imagen: 'https://via.placeholder.com/400x300?text=ADATA+16GB'
  },

  // DISCOS DUROS
  {
    nombre: 'WD Red Pro 12TB NAS',
    categoria: 'Discos duros',
    descripcionTecnica: 'HDD 3.5" 12TB 7200RPM, cache 256MB, RAID optimizado, 24/7 duty cycle, 72MB/s',
    descripcionPrecios: 'Disco NAS profesional. Ideal para servidores RAID y backups críticos.',
    stockVisible: 7,
    precio: 7999,
    imagen: 'https://via.placeholder.com/400x300?text=WD+Red+12TB'
  },
  {
    nombre: 'Seagate Barracuda 8TB',
    categoria: 'Discos duros',
    descripcionTecnica: 'HDD 3.5" 8TB 5400RPM, cache 256MB, buen MTBF, acceso 8.5ms promedio',
    descripcionPrecios: 'Almacenamiento masivo económico. Perfecto para archivos y backups.',
    stockVisible: 12,
    precio: 3999,
    imagen: 'https://via.placeholder.com/400x300?text=Seagate+8TB'
  },
  {
    nombre: 'WD Blue 4TB',
    categoria: 'Discos duros',
    descripcionTecnica: 'HDD 3.5" 4TB 5400RPM, cache 256MB, bajo ruido, perfil bajo, 64MB/s',
    descripcionPrecios: 'Disco confiable para almacenamiento general. WD Blue es estándar industrial.',
    stockVisible: 15,
    precio: 1899,
    imagen: 'https://via.placeholder.com/400x300?text=WD+Blue+4TB'
  },
  {
    nombre: 'Seagate IronWolf 6TB NAS',
    categoria: 'Discos duros',
    descripcionTecnica: 'HDD 3.5" 6TB 5900RPM NAS, cache 256MB, optimizado para RAID, vibración mínima',
    descripcionPrecios: 'Disco RAID confiable para pequeños servidores. Excelente en multi-bahía.',
    stockVisible: 9,
    precio: 4499,
    imagen: 'https://via.placeholder.com/400x300?text=IronWolf+6TB'
  },
  {
    nombre: 'Toshiba X300 2TB',
    categoria: 'Discos duros',
    descripcionTecnica: 'HDD 3.5" 2TB 7200RPM, cache 64MB, velocidad alta, gaming optimizado',
    descripcionPrecios: 'Disco gaming antiguo. Aún funcional para drives secundarios o backup.',
    stockVisible: 11,
    precio: 1499,
    imagen: 'https://via.placeholder.com/400x300?text=Toshiba+2TB'
  },

  // SSD NVME
  {
    nombre: 'Samsung 990 Pro 4TB',
    categoria: 'SSD NVMe',
    descripcionTecnica: 'NVMe PCIe 4.0, 4TB, velocidad 7100MB/s lectura, 6000MB/s escritura, 1200TBW durabilidad',
    descripcionPrecios: 'SSD profesional para edición 4K y gaming competitivo. Lidera en velocidad.',
    stockVisible: 8,
    precio: 6999,
    imagen: 'https://via.placeholder.com/400x300?text=Samsung+990'
  },
  {
    nombre: 'Western Digital Black SN850X 2TB',
    categoria: 'SSD NVMe',
    descripcionTecnica: 'NVMe PCIe 4.0, 2TB, velocidad 7100MB/s lectura, formato M.2 2280, disipador aluminio',
    descripcionPrecios: 'SSD gaming profesional. Compatible PS5 y gaming extremo.',
    stockVisible: 13,
    precio: 3999,
    imagen: 'https://via.placeholder.com/400x300?text=WD+Black+2TB'
  },
  {
    nombre: 'Corsair MP600 1TB',
    categoria: 'SSD NVMe',
    descripcionTecnica: 'NVMe PCIe 4.0, 1TB, 4950MB/s lectura, 3950MB/s escritura, diseño compacto',
    descripcionPrecios: 'SSD presupuestario PCIe 4.0. Excelente para gaming económico.',
    stockVisible: 20,
    precio: 1799,
    imagen: 'https://via.placeholder.com/400x300?text=Corsair+1TB'
  },
]

export const sembrarCatalogoEjemplo = async () => {
  // Eliminar productos existentes primero
  const snapshot = await getDocs(coleccionCatalogo())
  for (const doc of snapshot.docs) {
    await deleteDoc(doc.ref)
  }
  // Ahora sembrar nuevos productos
  for (const producto of productosSemilla) {
    await addDoc(coleccionCatalogo(), producto)
  }
}
