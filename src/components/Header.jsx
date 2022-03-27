import React from 'react'
import { NewBudget } from './NewBudget'
import { ControlBudget } from './ControlBudget'

export const Header = ({budget ,setBudget, isValidBudget, setIsValidBudget, expenses, setExpenses}) => {
    return (
        <header>
            <h1>Planificador de gastos</h1>

            {isValidBudget ? (
                <ControlBudget 
                    budget={budget}
                    expenses={expenses}
                    budget={budget}
                    setExpenses={setExpenses}
                    setBudget={setBudget}
                    setIsValidBudget={setIsValidBudget}
                />
            ):(
                <NewBudget
                    budget={budget}
                    setBudget={setBudget}
                    setIsValidBudget={setIsValidBudget}
            />
            )}
           
        </header>
    )
}
