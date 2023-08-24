document.addEventListener('DOMContentLoaded', function () {
    const monthList = document.getElementById('month-list')
    const addExpenseButton = document.querySelector('a[href="expenses.html"]')

    let expenses = []

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
            const row = monthList.insertRow()
            const monthCell = row.insertCell(0)
            const totalCell = row.insertCell(1)
            monthCell.textContent = month
            totalCell.textContent = formatCurrency(total)
        }
    }

    monthList.addEventListener('click', function (event) {
        if (event.target.tagName === 'TD') {
            const selectedMonth =
                event.target.parentElement.firstElementChild.textContent
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

    // Função para formatar valor como moeda
    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value)
    }

    // Restante do código para carregar despesas da planilha
    const url =
        'https://script.google.com/macros/s/AKfycbzmylTHNOaxhvf8GwzBDO6FIP6tfbNY-WwT-4jB9JJw4tJuqQbx3IMwU82SKRg9opkq/exec'

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                expenses = data.data.map(expense => ({
                    ...expense,
                    value: parseFloat(expense.value),
                    month: expense.date.split('/')[1]
                }))

                months.forEach(createMonthItem)
            } else {
                console.error('Erro ao buscar despesas')
            }
        })
        .catch(error => {
            console.error(error)
        })
})
