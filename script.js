// Variáveis globais para armazenar despesas e IDs
let expenses = [] // Para exibição na tabela de despesas cadastradas
let allExpenses = [] // Para cálculos
let currentId = 1

// Função para adicionar uma despesa à lista
function addExpense() {
    const type = document.getElementById('expense-type').value
    const date = new Date(document.getElementById('expense-date').value)
    const paymentMethod = document.getElementById('payment-method').value
    const value = parseFloat(document.getElementById('expense-value').value)
    const closingDate = document.getElementById('closing-date').value
    const installments = document.getElementById('installments').value

    let expense = {
        id: currentId,
        type: type,
        date: date,
        installments: installments,
        closingDate: closingDate,
        paymentMethod: paymentMethod,
        value: value
    }

    let originalId = currentId // Salva o ID original

    if (paymentMethod === 'C.Crédito') {
        const installments = parseInt(
            document.getElementById('installments').value
        )

        for (let i = 0; i < installments; i++) {
            //installmentExpense.id = currentId
            // installmentExpense.originalId = originalId // Adiciona o campo originalId
            // installmentExpense.originalId = currentId // Adiciona o campo originalId
            let installmentExpense = { ...expense }
            installmentExpense.value = value / installments
            let installmentDate = new Date(date)
            installmentDate.setMonth(installmentDate.getMonth() + i)
            installmentExpense.date = installmentDate

            allExpenses.push(installmentExpense) // Adiciona a parcela à lista de todas as despesas
        }

        let installmentExpenseDate = { ...expense }
        let expensesClosingDate = new Date(closingDate)
        expensesClosingDate.setDate(expensesClosingDate.getDate() + 1)
        installmentExpenseDate.closingDate = expensesClosingDate

        let expenseDate = new Date(date)
        expenseDate.setDate(expenseDate.getDate() + 1)
        installmentExpenseDate.date = expenseDate

        expenses.push(installmentExpenseDate)
    } else {
        let oneExpenses = { ...expense }
        //oneExpenses.value = value

        let oneExpenseDate = date
        oneExpenseDate.setDate(oneExpenseDate.getDate() + 1)
        //oneExpenseDate.setMonth(oneExpenseDate.getMonth())
        oneExpenses.date = oneExpenseDate

        //let installmentExpense = { ...expense }

        // let installmentexpenseDate = new Date(date)
        // installmentexpenseDate.setDate(installmentexpenseDate.getDate() + 1)
        // oneExpenses.date = installmentexpenseDate

        //installmentExpense.closingDate = installmentexpenseDate

        //allExpenses.push(oneExpenses) // Adiciona a despesa à lista de todas as despesas
        //allExpenses.push(installmentExpenseDate) // Adiciona a despesa à lista de todas as despesas
        expenses.push(expense) // Adiciona a despesa à lista de despesas para exibição na tabela
        allExpenses.push(expense)
        //expenses.push(oneExpenses) // Adiciona a despesa à lista de todas as despesas
        // expense.originalId = originalId // Adiciona o campo originalId
    }

    //expenses.push(oneExpenses) // Adiciona a despesa à lista de despesas para exibição na tabela

    updateExpenseTable()
    updateMonthTable()
    clearFormFields()
    currentId++
}

// Função para atualizar a tabela de despesas
function updateExpenseTable() {
    const tableBody = document.getElementById('expense-table-body')

    tableBody.innerHTML = ''

    for (const expense of expenses) {
        var dataCompra = formatDateDayMonthYear(expense.date)

        if (expense.closingDate != null) {
            var dataFechamento = formatDateDayMonthYear(expense.closingDate)
        } else {
            dataFechamento = ''
        }
        //

        const row = document.createElement('tr')
        row.innerHTML = `
            <td id="td0">${expense.type}</td>
            <td>${expense.id}</td>
            <td>${dataCompra}</td>
            <td>${expense.paymentMethod}</td>
            <td>${expense.installments}</td>
            <td>${dataFechamento}</td>
            <td>${expense.value.toFixed(2)}</td>
            <td id="td6"><button class="delete-button"><i class="fas fa-trash" data-id="${
                expense.id
            }"></i></button></td>
        `

        tableBody.appendChild(row)
    }
}

function updateMonthTable() {
    // Atualiza a tabela de despesas por mês
    const selectedMonth = document.getElementById('view-month').value
    const monthlyTableBody = document.getElementById(
        'monthly-expense-table-body'
    )

    monthlyTableBody.innerHTML = ''

    for (const expense of allExpenses) {
        // if (expense.date.startsWith(selectedMonth)) {
        if (expense.date >= selectedMonth) {
            var dataCompra = formatDateMonthYear(expense.date)
            const row = document.createElement('tr')
            row.innerHTML = `
                <td>${dataCompra}</td>
                <td>${expense.id}</td>
                <td>${expense.type}</td>
                <td>${expense.value.toFixed(2)}</td>
            `

            monthlyTableBody.appendChild(row)
        }
    }
}

function formatDateDayMonthYear(date) {
    const data = new Date(date)
    const dia = String(data.getDate()).padStart(2, '0')
    // const dia = String((data.getDate()) + 1).padStart(2, '0')
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const ano = data.getFullYear()

    if (date == '') {
        return ''
    } else {
        return `${dia}-${mes}-${ano}`
    }
}

function formatDateMonthYear(date) {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${month}-${year}`
}

// Função para limpar os campos do formulário e ocultar os campos de cartão de crédito
function clearFormFields() {
    document.getElementById('expense-type').value = ''
    document.getElementById('expense-date').value = ''
    document.getElementById('expense-date').type = 'text'
    document.getElementById('payment-method').value = ''
    document.getElementById('expense-value').value = ''
    document.getElementById('installments').value = ''
    document.getElementById('closing-date').value = ''
    document.getElementById('closing-date').type = 'text'

    const creditCardFields = document.getElementById('credit-card-fields')
    creditCardFields.classList.add('hidden')
}

// Função para excluir uma despesa
function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id)
    allExpenses = allExpenses.filter(expense => expense.id !== id)

    let maxId = 0
    for (const expense of allExpenses) {
        if (expense.id > maxId) {
            maxId = expense.id
        }
    }
    console.log(
        'Despesa com id: ' +
            currentId +
            ' excluída antes de atualizar a tabela e limpar os campos'
    )

    currentId = maxId + 1

    updateExpenseTable()
    clearFormFields()

    console.log(
        'Despesa com id: ' +
            currentId +
            ' excluída após atualizar a tabela e limpar os campos'
    )
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('fa-trash')) {
        const id = parseInt(event.target.dataset.id)

        const confirmDelete = confirm(
            'Tem certeza que deseja excluir esta despesa?'
        )

        if (confirmDelete) {
            deleteExpense(id)
        }
    }
})

document
    .getElementById('expense-form')
    .addEventListener('submit', function (e) {
        e.preventDefault()
        addExpense()
    })

updateExpenseTable()

function formatDateToString(date) {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${year}-${month}-${day}`
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
        const id = parseInt(event.target.dataset.id)

        const confirmDelete = confirm(
            'Tem certeza que deseja excluir esta despesa?'
        )

        if (confirmDelete) {
            deleteExpense(id)
        }
    }
})

var input = document.querySelector('#expense-value')

input.addEventListener('input', function (e) {
    var num = this.value.replace(/[^0-9]/g, '')

    num = num.replace(/(\d)(\d{2})$/, '$1,$2')

    this.value = num.replace(',', '.')
})

const closingDateInput = document.getElementById('closing-date')
document
    .getElementById('payment-method')
    .addEventListener('change', function () {
        const creditCardFields = document.getElementById('credit-card-fields')
        const selectedPaymentMethod = this.value

        if (selectedPaymentMethod === 'C.Crédito') {
            creditCardFields.classList.remove('hidden')
            closingDateInput.setAttribute('required', '')
        } else {
            creditCardFields.classList.add('hidden')
            closingDateInput.removeAttribute('required')
        }
    })

document.addEventListener('DOMContentLoaded', function () {
    const dataAtual = new Date()

    const ano = dataAtual.getFullYear()
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0')
    const dia = String(dataAtual.getDate()).padStart(2, '0')

    // if (
    //     isNaN(dataAtual.getMonth()) == true ||
    //     isNaN(dataAtual.getDate() == true || isNaN(dataAtual.getYear() == true))
    // ) {
    //     dataFormatada = ''
    // }

    const dataFormatada = `${ano}-${mes}-${dia}`

    document.getElementById('expense-date').max = dataFormatada
    document.getElementById('closing-date').min = dataFormatada
})

function displayExpensesForSelectedMonth() {
    const selectedMonth = new Date(document.getElementById('view-month').value)
    // updateMonthTable()

    if (isNaN(selectedMonth)) {
        updateMonthTable()
    } else {
        const tableBody = document.getElementById('monthly-expense-table-body')

        tableBody.innerHTML = ''

        for (const expense of allExpenses) {
            // if (expense.date.startsWith(selectedMonth)) {
            const date = formatDateMonthYear(expense.date)
            // if (expense.date.startWith(selectedMonth)) {

            if (
                expense.date.getMonth() == selectedMonth.getMonth() + 1 &&
                expense.date.getFullYear() == selectedMonth.getFullYear()
            ) {
                const row = document.createElement('tr')
                row.innerHTML = `
            <td>${date}</td>
            <td>${expense.id}</td>
            <td>${expense.type}</td>
            <td>${expense.value.toFixed(2)}</td>
        `

                tableBody.appendChild(row)
                // } else {
                //     updateMonthTable()
            }
        }
    }
    // updateMonthTable()
}

document
    .getElementById('view-month')
    .addEventListener('change', displayExpensesForSelectedMonth)
