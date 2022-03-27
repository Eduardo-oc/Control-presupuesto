import React from 'react';
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import { fotmatDate } from '../helpers';

import IconSavings from '../img/icono_ahorro.svg';
import IconHome from '../img/icono_casa.svg';
import IconFood from '../img/icono_comida.svg';
import IconExpenses from '../img/icono_gastos.svg';
import IconSubscription from '../img/icono_suscripciones.svg';
import IconHealth from '../img/icono_salud.svg';
import IconLeisure from '../img/icono_ocio.svg';


const iconDictionary = {
    Ahorro : IconSavings,
    Comida : IconFood,
    Casa : IconHome,
    Varios : IconExpenses,
    Salud : IconHealth,
    Ocio : IconLeisure,
    Suscripciones : IconSubscription
}

export const Expense = ({expense, setEditExpense, deleteExpense}) => {

    const {category, amount, name, id, date} = expense;

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setEditExpense(expense)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    );
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => deleteExpense(id)}
                destructive={true}
            >   
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );
    return (
        <SwipeableList>
            <SwipeableListItem
                key={expense.id}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img 
                            src={iconDictionary[category]}
                            alt="icono gastos"
                        />
                        <div className="descripcion-gasto">
                            <p className="categoria">{category}</p>
                            <p className="nombre-gasto">{name}</p>
                            <p className="fecha-gasto">
                                Agregando el: {''}
                                <span>{fotmatDate(date)}</span>
                            </p>
                        </div>
                    </div>
                    <p className="cantidad-gasto">${amount}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
