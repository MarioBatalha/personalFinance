const Modal = {
  open() {
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    document.querySelector(".modal-overlay").classList.remove("active");
  }
};

const transactions = [{

    description: "Condóminio",
    amount: -5000000,
    date: "8/03/21"
  },

];

const Transaction = {
  all: transactions,
  add(transaction) {
    Transaction.all.push(transaction);

    App.reload();
  },

  remove(index) {
    Transaction.all.splice(index, 1);

    App.reload();
  },
  incomes() {
    let income = 0;

    transactions.forEach(transactions => {
      if (transactions.amount > 0) {
        income += transactions.amount;
      }
    });
    return income;
  },

  expenses() {
    let expense = 0;

    transactions.forEach(transactions => {
      if (transactions.amount < 0) {
        expense += transactions.amount;
      }
    });
    return expense;
  },

  total() {
    return Transaction.incomes() + Transaction.expenses();
  }
};

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);
    tr.dataset.index = index

    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transactions, index) {
    const CSSclass = transactions.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transactions.amount);
    const html = `
          <td class="description">${transactions.description}</td>
          <td class="${CSSclass}">${amount}</td>
          <td class="date">${transactions.date}</td>
          <td>
          <i class="fas fa-minus-circle" onclick="Transaction.remove()"></i>
          </td>
           `;

    return html;
  },

  updateBalance() {
    document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );
    document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );

    document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = "";
  }
};

const Utils = {
  formatAmount(value) {
    value = Number(value) * 100;

    return value;
  },

  formatDate(date) {
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  },

  formatCurrency(amount) {
    const signal = Number(amount) < 0 ? "" : "";

    value = String(amount).replace(/\D/g, "");
    value = Number(amount) / 100;

    value = amount.toLocaleString("AO-ANGOLA", {
      style: "currency",
      currency: "AOA"
    });
    return signal + value;
  }
};
const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    };
  },
  formatValues() {
    let {
      description,
      amount,
      date
    } = Form.getValues();

    amount = Utils.formatAmount(amount);

    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date
    };
  },

  validateFields() {
    const {
      description,
      amount,
      date
    } = Form.getValues();

    if (description.trim() === "" || amount === "" || date === "") {
      throw new Error("Por favor, preencha todos os campos");
    }
  },

  saveTransactions(transaction) {
    Transaction.add(transaction);
  },

  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },

  submit(event) {
    event.preventDefault();

    try {
      Form.validateFields();
      const transaction = Form.formatValues();

      Form.saveTransactions(transaction);
      Form.clearFields();

      Modal.close();
    } catch (error) {
      alert(error.message);
    }
  }
};

const App = {
  init() {
    transactions.forEach(DOM.addTransaction)
    DOM.updateBalance();
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  }
};

App.init();