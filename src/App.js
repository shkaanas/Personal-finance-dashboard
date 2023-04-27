import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';
import './style.scss';

function App() {
  const [handler, setHandler] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [balanceStart, setBalanceStart] = useState(0);
  const [balanceStartChange, setBalanceStartChange] = useState(false);
  const [incomes, setIncomes] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const date = new Date()
  

  const [incomesList, setIncomesList] = useState([
    {
      id: '1',
      title: 'Тестовий дохід',
      amount: 200,
    },
  ]);
  const [expensesList, setExpensesList] = useState([
    {
      id: '1',
      title: 'Тестова витрата',
      amount: 123,
    },
  ]);

  useEffect(() => {
    function summurize() {
      let incomeArr = [];
      let expensesArr = [];

      incomesList.map((item) => incomeArr.push(parseInt(item.amount)));
      setIncomes(
        incomeArr.reduce((a, b) => {
          return a + b;
        }, 0)
      );

      expensesList.map((item) => expensesArr.push(parseInt(item.amount)));
      setExpenses(
        expensesArr.reduce((a, b) => {
          return a + b;
        }, 0)
      );
    }

    summurize();
  }, [incomesList, expensesList, balanceStart]);

  return (
    <div className="gradient">
      <div className="card">
        <div className="conclusions flex justify-evenly">
          <div className="card_inner card_inner__1">
            <p>Дохід</p>
            <span>+ {incomes} ₴</span>
          </div>
          <div className="card_inner card_inner__2">
            <p>Витрати</p>
            <span className="text-stone-100">- {expenses} ₴</span>
          </div>
          <div className="card_inner card_inner__3">
            <p>Баланс</p>
            <span className="text-stone-100">{incomes - expenses + parseInt(balanceStart)} ₴</span>
          </div>
          <div className="card_inner card_inner__3">
            <p>Початковий баланс</p>
            {balanceStartChange ? (
              <>
                <input
                  onChange={(e) => setBalanceStart(e.target.value)}
                  name="balance"
                  type="number"
                  className="input_change"
                />
                <button
                  onClick={() => setBalanceStartChange(false)}
                  className="text-base ml-5"
                >
                  Зберегти
                </button>
              </>
            ) : (
              <>
                <span>{balanceStart} ₴</span>
                <button
                  onClick={() => setBalanceStartChange(true)}
                  className="text-base ml-5"
                >
                  Змінити
                </button>
              </>
            )}
          </div>
        </div>

        <div className="conclusion flex flex-col">
          <div className="btn_block">
            <button
              className={`btn btn_base ${!handler && 'btn_base_active'}`}
              onClick={() => setHandler(false)}
            >
              Дохід
            </button>
            <button
              className={`btn btn_base ${handler && 'btn_base_active'}`}
              onClick={() => setHandler(true)}
            >
              Витрати
            </button>
          </div>

          {handler ? (
            <div className="conclusion flex flex-col">
              <h2 className="mx-auto title title_alt">Витрати</h2>
              <div className="list">
                {expensesList.map((item) => (
                  <div className="list_item" key={item.id}>
                    <div className="flex">
                      <div className="list_item_arrow mr-5">⭣</div>
                      <div>
                        <h3 className="list_item_title">{item.title}</h3>
                        <p>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</p>
                      </div>
                    </div>
                    <h3 className="list_item_title">- {item.amount} ₴</h3>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="conclusion flex flex-col">
              <h2 className="mx-auto title">Дохід</h2>
              <div className="list">
                {incomesList.map((item) => (
                  <div className="list_item list_item_alt" key={item.id}>
                    <div className="flex">
                      <div className="list_item_arrow list_item_arrow_alt mr-5">
                        ⭡
                      </div>
                      <div>
                        <h3 className="list_item_title">{item.title}</h3>
                        <p>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</p>
                      </div>
                    </div>
                    <h3 className="list_item_title">+ {item.amount} ₴</h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setOpenModal(true)}
            className="btn btn_base btn_base_active mx-auto text-3xl font-semibold"
          >
            Додати
          </button>
          {openModal && (
            <Modal
              closeModal={setOpenModal}
              handler={handler}
              addExpensesList={setExpensesList}
              addIncomeList={setIncomesList}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
