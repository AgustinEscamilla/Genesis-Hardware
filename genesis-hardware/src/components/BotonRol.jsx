export function SelectorRolCuenta({ rol, seleccionado, alHacerClic, texto }) {
    // aqui maestro yo asigne las clases de colores segun si esta activo o inactivo
    const estilosActivo = 'bg-red-500 text-white'
    const estilosInactivo = 'bg-[#2a2a2a] text-gray-400 hover:bg-gray-700'
    const estilosBase = 'px-6 py-2 rounded font-bold'

    // esto sirve para pintar un boton que cambia de color al darle clic
    return (
        <button
            type="button"
            onClick={() => alHacerClic(rol)}
            className={`${estilosBase} ${seleccionado === rol ? estilosActivo : estilosInactivo}`}
        >
            {texto}
        </button>
    )
}