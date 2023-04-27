import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

function Modal({ closeModal, handler, addExpensesList, addIncomeList }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  function handleClickExpenses() {
    addExpensesList((prev) => [
      {
        id: uuid(),
        title: title,
        amount: amount,
      },
      ...prev,
    ]);

    closeModal(false);
  }

  function handleClickIncomes() {
    addIncomeList((prev) => [
      {
        id: uuid(),
        title: title,
        amount: amount,
      },
      ...prev,
    ]);

    closeModal(false);
  }

  return (
    <div>
      <div className="modal">
        {handler ? (
          <>
            <h2 className="mx-auto title title_alt">Витрати</h2>
            <div className="flex flex-col justify-center items-start my-10 mx-auto">
              <label className="label">Назва:</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                name="title"
                className="input"
              />
            </div>
            <div className="flex flex-col justify-center items-start my-10 mx-auto">
              <label className="label">Витрачена сума:</label>
              <input
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                name="amount"
                className="input"
              />
            </div>

            <button
              onClick={handleClickExpenses}
              className="btn btn_base btn_base_active mx-auto"
            >
              Додати
            </button>
          </>
        ) : (
          <>
            <h2 className="mx-auto title title_alt ">Дохід</h2>
            <div className="flex flex-col justify-center items-start my-10 mx-auto">
              <label className="label">Назва:</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                name="title2"
                className="input"
              />
            </div>
            <div className="flex flex-col justify-center items-start my-10 mx-auto">
              <label className="label">Сума доходу:</label>
              <input
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                name="amount2"
                className="input"
              />
            </div>

            <button
              onClick={handleClickIncomes}
              className="btn btn_base btn_base_active mx-auto"
            >
              Додати
            </button>
          </>
        )}

        <button
          onClick={() => closeModal(false)}
          className="btn mx-auto my-3 title_alt"
        >
          Назад
        </button>
      </div>
    </div>
  );
}

export default Modal;
