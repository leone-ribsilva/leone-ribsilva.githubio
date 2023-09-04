let expenses = []
let idCounter = 1

document
    .getElementById('paymentMethod')
    .addEventListener('change', function () {
        var creditCardDetails = document.getElementById('creditCardDetails')
        if (this.value === 'Cartão de crédito') {
            creditCardDetails.style.display = 'block'
        } else {
            creditCardDetails.style.display = 'none'
        }
    })

document.getElementById('expenseForm').addEventListener('submit', function (e) {
    e.preventDefault()

    let expenseType = document.getElementById('expenseType').value
    let purchaseDate = document.getElementById('purchaseDate').value
    let paymentMethod = document.getElementById('paymentMethod').value
    let value = document.getElementById('value').value
    let installments = document.getElementById('installments').value
    let invoiceClosingDate = document.getElementById('invoiceClosingDate').value

    let expense = {
        id: idCounter++,
        expenseType: expenseType,
        purchaseDate: purchaseDate,
        paymentMethod: paymentMethod,
        value: value,
        installments: installments,
        invoiceClosingDate: invoiceClosingDate
    }

    expenses.push(expense)
    addExpenseToTable(expense)
})

function addExpenseToTable(expense) {
    let table = document.getElementById('expensesTable')
    let row = table.insertRow()
    row.id = 'expense-' + expense.id

    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)
    let cell3 = row.insertCell(2)
    let cell4 = row.insertCell(3)
    let cell5 = row.insertCell(4)
    let cell6 = row.insertCell(5)

    cell1.innerHTML = expense.expenseType
    cell2.innerHTML = expense.purchaseDate
    cell3.innerHTML = expense.paymentMethod
    cell4.innerHTML = expense.value
    cell5.innerHTML = expense.installments
    cell6.innerHTML = expense.invoiceClosingDate

    let deleteButton = document.createElement('button')
    deleteButton.innerHTML = 'Excluir'
    deleteButton.addEventListener('click', function () {
        deleteExpense(expense.id)
    })

    let cell7 = row.insertCell(6)
    cell7.appendChild(deleteButton)
}

function deleteExpense(id) {
    let index = expenses.findIndex(expense => expense.id === id)
    if (index !== -1) {
        expenses.splice(index, 1)
        let row = document.getElementById('expense-' + id)
        row.parentNode.removeChild(row)
    }
}
