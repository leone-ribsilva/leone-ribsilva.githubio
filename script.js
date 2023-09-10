// Variáveis globais para armazenar despesas e IDs
let expenses = []
let currentId = 1

// Função para adicionar uma despesa à lista
function addExpense() {
    const type = document.getElementById('expense-type').value
    const date = formatDate(document.getElementById('expense-date').value)
    const paymentMethod = document.getElementById('payment-method').value
    const value = parseFloat(document.getElementById('expense-value').value)
    const closingDate = formatDate(
        document.getElementById('closing-date').value
    ) // Captura o valor da data de fechamento da fatura

    let expense = {
        id: currentId++,
        type: type,
        date: date,
        paymentMethod: paymentMethod,
        value: value
    }

    // Verifica se a forma de pagamento é Cartão de crédito, caso sim, adiciona o número de parcelas e data de fechamento da fatura no array
    if (paymentMethod === 'C.Crédito') {
        const installments = parseInt(
            document.getElementById('installments').value
        )
        expense.installments = installments
        expense.closingDate = closingDate
    } else {
        expense.installments = ''
        expense.closingDate = ''
    }

    expenses.push(expense)
    updateExpenseTable()
    clearFormFields()
}

// Função para atualizar a tabela de despesas
function updateExpenseTable() {
    const tableBody = document.getElementById('expense-table-body') // Selecione o tbody pelo ID

    tableBody.innerHTML = ''

    for (const expense of expenses) {
        const row = document.createElement('tr')
        row.innerHTML = `
      <td id="td0">${expense.type}</td>
      <td>${expense.date}</td>
      <td>${expense.paymentMethod}</td>
      <td>${expense.installments}</td>
      <td>${expense.closingDate}</td>
      <td>${expense.value.toFixed(2)}</td>
      <td id="td6"><button class="delete-button" data-id="${
          expense.id
      }">Excluir</button></td>
    `

        tableBody.appendChild(row)
        console.log('O próximo Id é: ', currentId)
    }
}

// Função para limpar os campos do formulário
function clearFormFields() {
    document.getElementById('expense-type').value = ''
    document.getElementById('expense-date').value = ''
    document.getElementById('expense-date').type = 'text'
    document.getElementById('payment-method').value = ''
    document.getElementById('expense-value').value = ''
    document.getElementById('installments').value = ''
    document.getElementById('closing-date').value = ''

    const creditCardFields = document.getElementById('credit-card-fields')
    creditCardFields.style.display = 'none'
}

// Função para excluir uma despesa
function deleteExpense(id) {
    console.log('Excluindo despesa com ID:', id)
    expenses = expenses.filter(expense => expense.id !== id)
    console.log('Depois da exclusão:', expenses)
    // Encontre o maior ID nas despesas restantes
    let maxId = 0
    for (const expense of expenses) {
        if (expense.id > maxId) {
            maxId = expense.id
        }
    }

    // Atualize currentId para o próximo ID disponível
    currentId = maxId + 1

    updateExpenseTable()
    console.log('O próximo Id é: ', currentId)
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

function formatDate(inputDate) {
    let data = new Date(inputDate)
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    let formattedDate = data.toLocaleDateString('pt-BR', options)
    return formattedDate
}

// Event listener para os botões de exclusão
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
        const id = parseInt(event.target.dataset.id) // Recupera o ID da despesa do atributo data-id
        deleteExpense(id)
    }
})

// let data = '2023-09-10'
// console.log(formatDate(data)) // Retorna a data no formato DD/MM/AA

document.addEventListener('DOMContentLoaded', function () {
    // Event listener para a mudança na forma de pagamento
    document
        .getElementById('payment-method')
        .addEventListener('change', function () {
            const creditCardFields =
                document.getElementById('credit-card-fields')
            const selectedPaymentMethod = this.value

            if (selectedPaymentMethod === 'C.Crédito') {
                creditCardFields.style.display = 'block'
                console.log('Mudou para block')
            } else {
                creditCardFields.style.display = 'none'
                console.log('Mudou para none')
            }
        })
})
