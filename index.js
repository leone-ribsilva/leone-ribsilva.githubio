//////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
    const monthList = document.getElementById('month-list')
    const addExpenseButton = document.getElementById('add-expense')

    const expenses = []

    function calculateTotal(month) {
        return expenses.reduce((total, expense) => {
            if (expense.month === month) {
                total += expense.value
            }
            return total
        }, 0)
    }

    function showTotal(month) {
        const total = calculateTotal(month)
        alert(`Total de despesas em ${month}: R$ ${total.toFixed(2)}`)
    }

    function createMonthItem(month) {
        const total = calculateTotal(month)
        if (total > 0) {
            const li = document.createElement('li')
            li.textContent = month
            monthList.appendChild(li)
        }
    }

    monthList.addEventListener('click', function (event) {
        if (event.target.tagName === 'LI') {
            const selectedMonth = event.target.textContent
            showTotal(selectedMonth)
        }
    })

    addExpenseButton.addEventListener('click', function () {
        window.location.href = 'expenses.html'
    })

    const months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ]
    months.forEach(createMonthItem)

    // Função para atualizar a tabela de despesas por mês
    function updateExpensesByMonthTable() {
        const expensesByMonthTable = document
            .getElementById('expenses-by-month')
            .getElementsByTagName('tbody')[0]
        expensesByMonthTable.innerHTML = ''

        const expensesByMonth = calculateExpensesByMonth(expenses)

        for (const [month, total] of Object.entries(expensesByMonth)) {
            const row = expensesByMonthTable.insertRow()
            const monthCell = row.insertCell(0)
            const totalCell = row.insertCell(1)
            monthCell.textContent = month
            totalCell.textContent = formatCurrency(total)
        }
    }

    // Função para calcular despesas por mês
    function calculateExpensesByMonth(expenses) {
        const expensesByMonth = {}

        for (const expense of expenses) {
            if (expensesByMonth[expense.month]) {
                expensesByMonth[expense.month] += expense.value
            } else {
                expensesByMonth[expense.month] = expense.value
            }
        }

        return expensesByMonth
    }

    // Função para formatar valor como moeda
    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value)
    }

    // Chamar a função para atualizar a tabela inicialmente
    updateExpensesByMonthTable()
})
