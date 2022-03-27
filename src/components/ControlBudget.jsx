import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import "react-circular-progressbar/dist/styles.css";

export const ControlBudget = ({budget, expenses, setExpenses, setBudget, setIsValidBudget}) => {

    const [available, setAvailable] = useState(0);
    const [spent, setSpent] = useState(0);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const totalSpent = expenses.reduce((total, spending) => Number(spending.amount) + Number(total), 0);
        const totalAvailable = budget - totalSpent;

        //Calculamos porcentaje gastado
        const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(2);

        setSpent(totalSpent);
        setAvailable(totalAvailable);
        setTimeout(() => {
            setPercentage(newPercentage);
        }, 1000);

    }, [expenses])

    const formatBudget = (amount) => {
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const result = confirm('¿Deseas reiniciar la app?');
        if(result){
            setExpenses([]);
            setBudget(0);
            setIsValidBudget(false);
        }
        
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: percentage > 100 ? '#DC2626' : '#3B82F6'
                    })}
                    text={`${percentage}% Gastado`}
                />
            </div>

            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span> {formatBudget(budget)}
                </p>
                <p className={`${available < 0  ? 'negativo' : ''}`}>
                    <span>Disponible: </span> {formatBudget(available)}
                </p>
                <p>
                    <span>Gastado: </span> {formatBudget(spent)}
                </p>
            </div>
        </div>
    )
}
