// aqui maestro yo dejo editar las categorias y especificaciones de la ficha tecnica del producto
export function EditorEspecificacionesTecnicas({
    especificaciones,
    agregarCategoria,
    eliminarCategoria,
    cambiarCategoria,
    agregarEspecificacion,
    eliminarEspecificacion,
    cambiarEspecificacion
}) {
    return (
        <div className="flex flex-col gap-3 rounded-lg border border-borde p-3">
            <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-primario">Ficha tecnica</span>
                <button type="button" onClick={agregarCategoria} className="text-xs text-terciario hover:underline">+ Agregar categoria</button>
            </div>
            {especificaciones.length === 0 && <p className="text-xs text-mutado">Sin categorias, agrega una para empezar</p>}
            {especificaciones.map((grupo, indiceCategoria) => (
                <div key={indiceCategoria} className="flex flex-col gap-2 rounded border border-borde p-2">
                    <div className="flex items-center gap-2">
                        <input
                            value={grupo.categoria}
                            onChange={e => cambiarCategoria(indiceCategoria, e.target.value)}
                            placeholder="Nombre de la categoria"
                            className="flex-1 bg-fondo border border-borde text-texto px-2 py-1 text-xs"
                        />
                        <button type="button" onClick={() => eliminarCategoria(indiceCategoria)} className="text-xs text-primario hover:underline">Eliminar</button>
                    </div>
                    {grupo.especificaciones.map((espec, indiceEspec) => (
                        <div key={indiceEspec} className="flex items-center gap-2">
                            <input
                                value={espec.clave}
                                onChange={e => cambiarEspecificacion(indiceCategoria, indiceEspec, 'clave', e.target.value)}
                                placeholder="Caracteristica"
                                className="flex-1 bg-fondo border border-borde text-texto px-2 py-1 text-xs"
                            />
                            <input
                                value={espec.valor}
                                onChange={e => cambiarEspecificacion(indiceCategoria, indiceEspec, 'valor', e.target.value)}
                                placeholder="Valor"
                                className="flex-1 bg-fondo border border-borde text-texto px-2 py-1 text-xs"
                            />
                            <button type="button" onClick={() => eliminarEspecificacion(indiceCategoria, indiceEspec)} className="text-xs text-primario hover:underline">✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => agregarEspecificacion(indiceCategoria)} className="self-start text-xs text-terciario hover:underline">
                        + Agregar caracteristica
                    </button>
                </div>
            ))}
        </div>
    )
}
