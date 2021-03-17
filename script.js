const Modal = {
  open() {
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    document.querySelector(".modal-overlay").classList.remove("active");
  }
};

const transactions = [{
    id: 1,
    description: "Luz",
    amount: -500000,
    date: "8/03/21"
  },
  {
    id: 2,
    description: "Agua",
    amount: 200000,
    date: "18/03/21"
  },
  {
    id: 3,
    description: "Saldo",
    amount: -100000,
    date: "8/08/21"
  },
  {
    id: 3,
    description: "Roupas",
    amount: 1000000,
    date: "1/10/21"
  }
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
    return Transactions.incomes() + Transactions.expenses();
  }
};

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transactions) {
    const CSSclass = transactions.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transactions.amount);
    const html = `
          <td class="description">${transactions.description}</td>
          <td class="${CSSclass}">${amount}</td>
          <td class="date">${transactions.date}</td>
          <td>
          <i class="fas fa-minus-circle">Remover</i>
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
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");
    value = Number(value) / 100;

    value = value.toLocaleString("AO-ANGOLA", {
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
      date: Form.date.value,
    }
  },
  dataFormat() {

  },

  validateFields() {
    const {
      description,
      amount,
      date
    } = Form.getValues()

    if (description.trim() === "")
  },

  submit(event) {
    event.preventDefault();

  }
}

const App = {
  init() {
    transactions.forEach(transactions => {
      DOM.addTransaction(transactions);
    });

    DOM.updateBalance();
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  }
};


App.init();