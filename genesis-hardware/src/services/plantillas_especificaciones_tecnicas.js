// esto sirve para generar la ficha tecnica del producto aceptando valores reales opcionales

export const plantillaEspecificacionesDisco = (v = {}) => [
    {
        categoria: 'Detalles Técnicos', especificaciones: [
            { clave: 'Capacidad', valor: v.capacidad || '' },
            { clave: 'Factor de forma', valor: v.factor_forma || '' },
            { clave: 'Intervalo de temperatura operativo', valor: v.temperatura || '' },
            { clave: 'Interfaz', valor: v.interfaz || '' }
        ]
    },
    {
        categoria: 'Peso y Dimensiones', especificaciones: [
            { clave: 'Ancho', valor: v.ancho || '' },
            { clave: 'Peso', valor: v.peso || '' },
            { clave: 'Profundidad', valor: v.profundidad || '' },
            { clave: 'Altura', valor: v.altura || '' }
        ]
    },
    {
        categoria: 'Desempeño', especificaciones: [
            { clave: 'Componente para', valor: v.componente_para || '' },
            { clave: 'Compatible con NVM Express', valor: v.compatible_nvme || '' },
            { clave: 'Disco duro', valor: v.tipo_disco || '' },
            { clave: 'Velocidad de escritura', valor: v.velocidad_escritura || '' }
        ]
    }
]

export const plantillaEspecificacionesSsd = (v = {}) => [
    {
        categoria: 'Detalles Técnicos', especificaciones: [
            { clave: 'Capacidad', valor: v.capacidad || '' },
            { clave: 'Factor de forma', valor: v.factor_forma || '' },
            { clave: 'Intervalo de temperatura operativo', valor: v.temperatura || '' },
            { clave: 'Interfaz', valor: v.interfaz || '' }
        ]
    },
    {
        categoria: 'Peso y Dimensiones', especificaciones: [
            { clave: 'Ancho', valor: v.ancho || '' },
            { clave: 'Peso', valor: v.peso || '' },
            { clave: 'Profundidad', valor: v.profundidad || '' },
            { clave: 'Altura', valor: v.altura || '' }
        ]
    },
    {
        categoria: 'Desempeño', especificaciones: [
            { clave: 'Componente para', valor: v.componente_para || '' },
            { clave: 'Compatible con NVM Express', valor: v.compatible_nvme || '' },
            { clave: 'Velocidad de lectura', valor: v.velocidad_lectura || '' },
            { clave: 'Velocidad de escritura', valor: v.velocidad_escritura || '' }
        ]
    }
]

export const plantillaEspecificacionesMemoria = (v = {}) => [
    {
        categoria: 'Detalles Técnicos', especificaciones: [
            { clave: 'Capacidad', valor: v.capacidad || '' },
            { clave: 'Factor de forma', valor: v.factor_forma || '' },
            { clave: 'Frecuencia', valor: v.frecuencia || '' },
            { clave: 'Latencia CAS', valor: v.latencia || '' }
        ]
    },
    {
        categoria: 'Peso y Dimensiones', especificaciones: [
            { clave: 'Ancho', valor: v.ancho || '' },
            { clave: 'Peso', valor: v.peso || '' },
            { clave: 'Profundidad', valor: v.profundidad || '' },
            { clave: 'Altura', valor: v.altura || '' }
        ]
    },
    {
        categoria: 'Desempeño', especificaciones: [
            { clave: 'Componente para', valor: v.componente_para || '' },
            { clave: 'Voltaje', valor: v.voltaje || '' },
            { clave: 'Tecnología', valor: v.tecnologia || '' },
            { clave: 'Velocidad de transferencia', valor: v.velocidad_transferencia || '' }
        ]
    }
]

export const plantillaEspecificacionesProcesador = (v = {}) => [
    {
        categoria: 'Detalles Técnicos', especificaciones: [
            { clave: 'Núcleos y Hilos', valor: v.nucleos || '' },
            { clave: 'Factor de forma', valor: v.factor_forma || '' },
            { clave: 'Intervalo de temperatura operativo', valor: v.temperatura || '' },
            { clave: 'Socket', valor: v.socket || '' }
        ]
    },
    {
        categoria: 'Peso y Dimensiones', especificaciones: [
            { clave: 'Ancho', valor: v.ancho || '' },
            { clave: 'Peso', valor: v.peso || '' },
            { clave: 'Profundidad', valor: v.profundidad || '' },
            { clave: 'Altura', valor: v.altura || '' }
        ]
    },
    {
        categoria: 'Desempeño', especificaciones: [
            { clave: 'Componente para', valor: v.componente_para || '' },
            { clave: 'Frecuencia base', valor: v.frecuencia_base || '' },
            { clave: 'Frecuencia turbo', valor: v.frecuencia_turbo || '' },
            { clave: 'TDP', valor: v.tdp || '' }
        ]
    }
]

export const plantillaEspecificacionesPlacaMadre = (v = {}) => [
    {
        categoria: 'Detalles Técnicos', especificaciones: [
            { clave: 'Socket', valor: v.socket || '' },
            { clave: 'Chipset', valor: v.chipset || '' },
            { clave: 'Factor de forma', valor: v.factor_forma || '' },
            { clave: 'Memoria compatible', valor: v.memoria_compatible || '' }
        ]
    },
    {
        categoria: 'Peso y Dimensiones', especificaciones: [
            { clave: 'Ancho', valor: v.ancho || '' },
            { clave: 'Peso', valor: v.peso || '' },
            { clave: 'Profundidad', valor: v.profundidad || '' },
            { clave: 'Altura', valor: v.altura || '' }
        ]
    },
    {
        categoria: 'Desempeño', especificaciones: [
            { clave: 'Componente para', valor: v.componente_para || '' },
            { clave: 'Ranuras PCIe', valor: v.ranuras_pcie || '' },
            { clave: 'Puertos SATA', valor: v.puertos_sata || '' },
            { clave: 'Soporte M.2', valor: v.soporte_m2 || '' }
        ]
    }
]

export const plantillaEspecificacionesFuentePoder = (v = {}) => [
    {
        categoria: 'Detalles Técnicos', especificaciones: [
            { clave: 'Potencia', valor: v.potencia || '' },
            { clave: 'Certificación', valor: v.certificacion || '' },
            { clave: 'Modularidad', valor: v.modularidad || '' },
            { clave: 'Factor de forma', valor: v.factor_forma || '' }
        ]
    },
    {
        categoria: 'Peso y Dimensiones', especificaciones: [
            { clave: 'Ancho', valor: v.ancho || '' },
            { clave: 'Peso', valor: v.peso || '' },
            { clave: 'Profundidad', valor: v.profundidad || '' },
            { clave: 'Altura', valor: v.altura || '' }
        ]
    },
    {
        categoria: 'Desempeño', especificaciones: [
            { clave: 'Componente para', valor: v.componente_para || '' },
            { clave: 'Eficiencia', valor: v.eficiencia || '' },
            { clave: 'Conectores PCIe', valor: v.conectores_pcie || '' },
            { clave: 'Ventilador', valor: v.ventilador || '' }
        ]
    }
]

export const plantillaEspecificacionesEnfriamiento = (v = {}) => [
    {
        categoria: 'Detalles Técnicos', especificaciones: [
            { clave: 'Tipo', valor: v.tipo || '' },
            { clave: 'Compatibilidad de socket', valor: v.socket || '' },
            { clave: 'Material del disipador', valor: v.material || '' },
            { clave: 'Número de heat pipes', valor: v.heat_pipes || '' }
        ]
    },
    {
        categoria: 'Peso y Dimensiones', especificaciones: [
            { clave: 'Ancho', valor: v.ancho || '' },
            { clave: 'Peso', valor: v.peso || '' },
            { clave: 'Profundidad', valor: v.profundidad || '' },
            { clave: 'Altura', valor: v.altura || '' }
        ]
    },
    {
        categoria: 'Desempeño', especificaciones: [
            { clave: 'Componente para', valor: v.componente_para || '' },
            { clave: 'TDP soportado', valor: v.tdp_soportado || '' },
            { clave: 'Nivel de ruido', valor: v.ruido || '' },
            { clave: 'Velocidad del ventilador', valor: v.velocidad_ventilador || '' }
        ]
    }
]

export const plantillaEspecificacionesVideo = (v = {}) => [
    {
        categoria: 'Detalles Técnicos', especificaciones: [
            { clave: 'Memoria de video', valor: v.memoria_video || '' },
            { clave: 'Factor de forma', valor: v.factor_forma || '' },
            { clave: 'Intervalo de temperatura operativo', valor: v.temperatura || '' },
            { clave: 'Interfaz', valor: v.interfaz || '' }
        ]
    },
    {
        categoria: 'Peso y Dimensiones', especificaciones: [
            { clave: 'Ancho', valor: v.ancho || '' },
            { clave: 'Peso', valor: v.peso || '' },
            { clave: 'Profundidad', valor: v.profundidad || '' },
            { clave: 'Altura', valor: v.altura || '' }
        ]
    },
    {
        categoria: 'Desempeño', especificaciones: [
            { clave: 'Componente para', valor: v.componente_para || '' },
            { clave: 'Consumo TGP', valor: v.tgp || '' },
            { clave: 'Tecnología Ray Tracing', valor: v.ray_tracing || '' },
            { clave: 'Velocidad de reloj', valor: v.velocidad_reloj || '' }
        ]
    }
]
