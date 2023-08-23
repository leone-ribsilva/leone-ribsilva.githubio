const googleSheetsApiKey = 'AIzaSyDf_YWXZu4HmiJXG9QteBdXW04rYYoDCVI'
const googleSheetsSpreadsheetId = '1ldywpMMJACbELnx8xGeBnu-fhcqu7VZmLXSGRa3ZZYM'

// Função para adicionar uma nova despesa à planilha
function addExpenseToGoogleSheets(expense) {
    const url = `https://script.google.com/macros/s/AKfycbzEAoUV40mJRg0i0zr_EPnTzOAffGq9yFgTwtw7WvPT8jTTMQ6aq8mycIljHhVhzWLo/exec`

    const data = {
        values: [
            [
                expense.type,
                expense.method,
                expense.date,
                expense.value,
                expense.installments,
                expense.closingDate
            ]
        ]
    }

    // fetch(`${url}?key=${googleSheetsApiKey}`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Despesa adicionada com sucesso:', data)
    //     })
    //     .catch(error => {
    //         console.error('Erro ao adicionar despesa:', error)
    //     })

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(message => {
            console.log(message) // Deve imprimir "Despesa adicionada com sucesso!"
        })
        .catch(error => {
            console.error(error)
        })
}

//document.addEventListener('DOMContentLoaded', function () {
//const saveButton = document.getElementById('save-expense-button')

// saveButton.addEventListener('click', function () {
//     // Aqui você deve pegar os valores dos campos do formulário
//     const expense = {
//         type: document.getElementById('expense-type').value,
//         method: document.getElementById('payment-method').value,
//         date: document.getElementById('purchase-date').value,
//         value: document.getElementById('expense-value').value,
//         installments: document.getElementById('installments').value,
//         closingDate: document.getElementById('closing-date').value
//     }

// Chame a função para adicionar a despesa ao Google Sheets
//addExpenseToGoogleSheets(expense)
//})

// Função para carregar despesas da planilha
function loadExpensesFromGoogleSheets() {
    const url = `https://script.google.com/macros/s/AKfycbx7gEIzNnCUsbQxxT5YZD_g5cDwQjY1PmmXOgF0DBUizscbpQDv1x62ecgjsTL7ujba/exec`

    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => {
    //         const rows = data.values || []
    //         console.log('Despesas carregadas:', rows)
    //     })
    //     .catch(error => {
    //         console.error('Erro ao carregar despesas:', error)
    //     })

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Seleciona o elemento HTML onde você deseja exibir a tabela
            const tableContainer = document.getElementById('table-container')

            // Cria a tabela
            const table = document.createElement('table')
            table.className = 'expense-table'

            // Cria a primeira linha de cabeçalho da tabela
            const headerRow = document.createElement('tr')
            headerRow.innerHTML = `
      <th>Tipo de Despesa</th>
      <th>Forma de Pagamento</th>
      <th>Data da Compra</th>
      <th>Valor</th>
      <th>Número de Parcelas</th>
      <th>Data de Fechamento</th>
    `
            table.appendChild(headerRow)

            // Adiciona as linhas das despesas
            data.forEach(expense => {
                const row = document.createElement('tr')
                row.innerHTML = `
        <td>${expense.type}</td>
        <td>${expense.method}</td>
        <td>${expense.date}</td>
        <td>${expense.value}</td>
        <td>${expense.installments}</td>
        <td>${expense.closingDate}</td>
      `
                table.appendChild(row)
            })

            // Adiciona a tabela ao container
            tableContainer.appendChild(table)
        })
        .catch(error => {
            console.error(error)
        })
}

///////////////////////////////////////////////////////////////////////////
const expenses = []
document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expense-form')
    const cancelExpenseButton = document.getElementById('cancel-expense')
    const creditCardFields = document.getElementById('credit-card-fields')
    const submitExpenseButton = document.getElementById('submit-expense')

    submitExpenseButton.addEventListener('click', function () {
        const expenseType = document.getElementById('expense-type').value
        const paymentMethod = document.getElementById('payment-method').value
        const purchaseDate = document.getElementById('purchase-date').value
        const amount = parseFloat(
            document.getElementById('amount').value.replace('R$', '')
        )
        const installments = document.getElementById('installments').value
        const closingDate = document.getElementById('closing-date').value

        const expense = {
            type: expenseType,
            method: paymentMethod,
            date: purchaseDate,
            value: amount,
            installments: installments,
            closingDate: closingDate,
            month: getMonthFromDateString(purchaseDate)
        }

        addExpenseToGoogleSheets(expense)
        expenses.push(expense)
        alert('Despesa cadastrada com sucesso!')
        expenseForm.reset()
    })

    cancelExpenseButton.addEventListener('click', function () {
        window.location.href = 'index.html'
    })

    const paymentMethod = document.getElementById('payment-method')
    paymentMethod.addEventListener('change', function () {
        if (paymentMethod.value === 'cartao-credito') {
            creditCardFields.style.display = 'block'
        } else {
            creditCardFields.style.display = 'none'
        }
    })

    function getMonthFromDateString(dateString) {
        const [day, month, year] = dateString.split('/')
        return `${month}/${year}`
    }
})
