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

    // Salvar uma despesa
    // No lugar do fetch(url)
    database.ref('expenses').push({
        type: expenseType,
        date: purchaseDate
        // ... outros campos
    })

    // Recuperar despesas
    // No lugar do fetch(url)
    database
        .ref('expenses')
        .once('value')
        .then(snapshot => {
            const expensesData = snapshot.val()
            const expensesArray = Object.values(expensesData) // Convertendo o objeto em um array

            // Limpar o conteúdo existente da tabela
            const tbody = document.querySelector('#month-list')
            tbody.innerHTML = ''

            expensesArray.forEach(expense => {
                const row = document.createElement('tr')

                const monthCell = document.createElement('td')
                monthCell.textContent = expense.date.split('/')[1] // Extraindo o mês da data
                row.appendChild(monthCell)

                const valueCell = document.createElement('td')
                valueCell.textContent = formatCurrency(
                    parseFloat(expense.value)
                )
                row.appendChild(valueCell)

                tbody.appendChild(row)
            })
        })
        .catch(error => {
            console.error(error)
        })
})

//     // Função para atualizar a tabela com os dados da planilha
//     function updateTable(data) {
//         // Selecione o elemento tbody da tabela
//         const tbody = document.querySelector('#month-list tbody')

//         // Limpe o conteúdo existente da tabela
//         tbody.innerHTML = ''

//         // Crie uma nova linha para cada linha de dados
//         data.forEach(function (row) {
//             const tr = document.createElement('tr')

//             // Crie uma nova célula para cada coluna de dados
//             row.forEach(function (cell) {
//                 const td = document.createElement('td')
//                 td.textContent = cell
//                 tr.appendChild(td)
//             })

//             // Adicione a linha à tabela
//             tbody.appendChild(tr)
//         })
//     }

//     // Chame a função readSheetData para ler os dados da planilha e atualizar a tabela
//     readSheetData()
