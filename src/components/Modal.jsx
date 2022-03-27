import React, { useState, useEffect } from 'react';
import { Message } from './Message';

import CloseModal from "../img/cerrar.svg";

export const Modal = ({
    setModal,
    animarModal,
    setAnimarModal,
    saveExpense,
    editExpense,
    setEditExpense
}) => {

    const [msg, setMsg] = useState("");

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [id, setId] = useState("");
    
    useEffect(() => {
        if(Object.keys(editExpense).length > 0){
            setName(editExpense.name);
            setAmount(editExpense.amount);
            setCategory(editExpense.category);
            setId(editExpense.id);
            setDate(editExpense.date);
          }
    }, [])

    const closeModal = () => {
        setAnimarModal(false);
        setTimeout(() => {
            setEditExpense({})
            setModal(false);
          }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if([name, amount, category].includes("")){
            setMsg("Todos los campos soj obligatorios");

            setTimeout(() => {
                setMsg("");
            }, 3000);
            return;
        }

        saveExpense({name, amount, category, id, date});
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CloseModal}
                    alt="Cerrar modal"
                    onClick={closeModal}
                />
            </div>

            <form 
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}
            >
                <legend>{editExpense.name ? "Editar Gasto" : "Nuevo Gasto"}</legend>
                {msg && <Message tipo="error">{msg}</Message>}
                
                <div className="campo">
                    <label htmlFor="name">Nombre Gasto</label>

                    <input 
                        id="name"
                        type="text"
                        placeholder="Añade el Nombre del Gasto"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="amount">Cantidad</label>

                    <input 
                        id="amount"
                        type="number"
                        placeholder="Añade la cantidad del gasto ej. 300"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="category">Categoria</label>

                    <select 
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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

                <input 
                    type="submit"
                    value={editExpense.name ? "Editar Gasto" : "Nuevo Gasto"}
                />
            </form>
        </div>
    )
}
