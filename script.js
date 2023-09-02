// Variáveis globais para armazenar despesas e IDs
let expenses = []
let currentId = 1

// Função para adicionar uma despesa à lista
function addExpense() {
    const type = document.getElementById('expense-type').value
    const date = document.getElementById('expense-date').value
    const paymentMethod = document.getElementById('payment-method').value
    const value = parseFloat(document.getElementById('expense-value').value)

    let expense = {
        id: currentId++,
        type: type,
        date: date,
        paymentMethod: paymentMethod,
        value: value
    }

    if (paymentMethod === 'Cartão de Crédito') {
        const installments = parseInt(
            document.getElementById('installments').value
        )
        const closingDate = document.getElementById('closing-date').value
        expense.installments = installments
        expense.closingDate = closingDate
    }

    expenses.push(expense)
    updateExpenseTable()
    clearFormFields()
}

// Função para atualizar a tabela de despesas
function updateExpenseTable() {
    const tableBody = document.getElementById('expense-table-body')

    tableBody.innerHTML = ''

    for (const expense of expenses) {
        const row = document.createElement('tr')
        row.innerHTML = `
      <td>${expense.type}</td>
      <td>${expense.date}</td>
      <td>${expense.paymentMethod}</td>
      <td>R$ ${expense.value.toFixed(2)}</td>
      <td><button onclick="deleteExpense(${expense.id})">Excluir</button></td>
    `

        tableBody.appendChild(row)
    }
}

// Função para limpar os campos do formulário
function clearFormFields() {
    document.getElementById('expense-type').value = ''
    document.getElementById('expense-date').value = ''
    document.getElementById('payment-method').value = ''
    document.getElementById('expense-value').value = ''
    document.getElementById('installments').value = ''
    document.getElementById('closing-date').value = ''
}

// Função para excluir uma despesa
function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id)
    updateExpenseTable()
}

// Event listener para o envio do formulário
document
    .getElementById('expense-form')
    .addEventListener('submit', function (e) {
        e.preventDefault()
        addExpense()
    })

// Inicializa a tabela de despesas
updateExpenseTable()
