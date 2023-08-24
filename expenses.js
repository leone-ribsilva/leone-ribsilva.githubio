async function addExpenseToGoogleSheets(expense) {
    const url = `https://script.google.com/macros/s/AKfycbwc8_mi1ZffQL5dYSt0dsj0L1455qy22QkvaOfs54stMEih6hrlm7EIAGJXMQJebN5R/exec`

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

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return response
    } catch (error) {
        throw error
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expense-form')
    const cancelExpenseButton = document.getElementById('cancel-expense')
    const creditCardFields = document.getElementById('credit-card-fields')
    const submitExpenseButton = document.getElementById('submit-expense')

    submitExpenseButton.addEventListener('click', async function () {
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

        try {
            const response = await addExpenseToGoogleSheets(expense)
            console.log(response)
            alert('Despesa cadastrada com sucesso!')
            expenseForm.reset()
        } catch (error) {
            console.error(error)
            alert('Erro ao cadastrar despesa.')
        }
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
// Restante do código para carregar despesas da planilha
const url =
    'https://script.google.com/macros/s/AKfycbzmylTHNOaxhvf8GwzBDO6FIP6tfbNY-WwT-4jB9JJw4tJuqQbx3IMwU82SKRg9opkq/exec'

fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            const expenses = data.data

            // Crie a tabela e adicione as linhas das despesas
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
