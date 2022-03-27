import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Modal } from './components/Modal';
import { ExpensesList } from './components/ExpensesList';
import { Filters } from './components/Filters';
import { getId } from './helpers';

import IconNewExpense from './img/nuevo-gasto.svg';

function App() {

  const [expenses, setExpenses] = useState(
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  );
  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
    );
  const [isValidBudget, setIsValidBudget] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [editExpense, setEditExpense] = useState({});
  const [filter, setFilter] = useState('');
  const [expensesFiltered, setExpensesFiltered] = useState([]);


  useEffect(() => {
    if(Object.keys(editExpense).length > 0){
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);

    }
  }, [editExpense])

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0);
  }, [budget])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? []);
  }, [expenses])

  useEffect(() => {
    if(filter){
      const expensesFiltered = expenses.filter( expense => expense.category === filter);
      setExpensesFiltered(expensesFiltered);
    }
  }, [filter])

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget')) ?? 0;

    if(budgetLS > 0){
      setIsValidBudget(true);
    }
  }, [])

  const handleNewExpense = () => {
    setModal(true);
    setEditExpense({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  }

  const saveExpense = (expense) => {

    if(expense.id){
      //Actualizar gasto
      const updatedExpenses = expenses.map( expenseState => expenseState.id === expense.id ? expense 
      : expenseState);
      setExpenses(updatedExpenses);
    }else{
    //nuevo gasto
    expense.id = getId();
    expense.date = Date.now();
    setExpenses([...expenses, expense]);
    }
    setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
          }, 500);
  }

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter( expense => expense.id !== id);

    setExpenses(updatedExpenses);
  }

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        setExpenses={setExpenses}
        expenses={expenses}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />

      {isValidBudget && (
        <>
          <main>
            <Filters
              filter={filter}
              setFilter={setFilter}
            />
            <ExpensesList
              expenses={expenses}
              setEditExpense={setEditExpense}
              deleteExpense={deleteExpense}
              expensesFiltered={expensesFiltered}
              filter={filter}
            />
          </main>
          <div className="nuevo-gasto">
            <img 
              src={IconNewExpense}
              alt="Icono nuevo gasto"
              onClick={handleNewExpense}
            />
          </div>
        </>
      )}
      {modal && <Modal
                  setModal={setModal}
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                  saveExpense={saveExpense}
                  editExpense={editExpense}
                  setEditExpense={setEditExpense}
                />}
        
    </div>
  )
}

export default App
