import React from 'react'

export const Filters = ({filter, setFilter}) => {
    return (
        <div className="filtros sombra contenedor">
            <form>
                <div className="campo">
                    <label>Filtrar Gastos</label>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                    <option value="" >-- Seleccione --</option>
                    <option value="Ahorro" >Ahorro</option>
                    <option value="Comida" >Comida</option>
                    <option value="Casa" >Casa</option>
                    <option value="Varios" >Gastos varios</option>
                    <option value="Salud" >Salud</option>
                    <option value="Ocio" >Ocio</option>
                    <option value="Suscripciones" >Suscripciones</option>
                    </select>
                </div>
            </form>
        </div>
    )
}
