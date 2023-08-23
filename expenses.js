const googleSheetsApiKey = 'AIzaSyDf_YWXZu4HmiJXG9QteBdXW04rYYoDCVI'
const googleSheetsSpreadsheetId = '1ldywpMMJACbELnx8xGeBnu-fhcqu7VZmLXSGRa3ZZYM'

// Função para adicionar uma nova despesa à planilha
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
            document.getElementById('expense-value').value.replace('R$', '')
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
        alert('Despesa cadastrada com sucesso!')
        expenseForm.reset()
    })

    // ... (restante do código)

    function getMonthFromDateString(dateString) {
        const [day, month, year] = dateString.split('/')
        return `${month}/${year}`
    }
})

// Função para carregar despesas da planilha
//const url =
//'https://script.google.com/macros/s/AKfycbzEAoUV40mJRg0i0zr_EPnTzOAffGq9yFgTwtw7WvPT8jTTMQ6aq8mycIljHhVhzWLo/exec' // Substitua pela URL que você copiou do Google Apps Script

const url =
    'https://script.google.com/macros/s/AKfycbzEAoUV40mJRg0i0zr_EPnTzOAffGq9yFgTwtw7WvPT8jTTMQ6aq8mycIljHhVhzWLo/exec' // Substitua pela URL que você copiou do Google Apps Script

fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            const expenses = data.data

            // Crie a tabela
            const table = document.createElement('table')
            table.className = 'expense-table'

            // Crie a primeira linha de cabeçalho da tabela
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

            // Adicione as linhas das despesas
            expenses.forEach(expense => {
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

            // Selecione o elemento HTML onde você deseja exibir a tabela
            const tableContainer = document.getElementById('table-container')

            // Adicione a tabela ao container
            tableContainer.appendChild(table)
        } else {
            console.error('Erro ao buscar despesas')
        }
    })
    .catch(error => {
        console.error(error)
    })
