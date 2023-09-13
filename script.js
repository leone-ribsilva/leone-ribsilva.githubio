// Variáveis globais para armazenar despesas e IDs
let expenses = []
let currentId = 1

// Função para adicionar uma despesa à lista
function addExpense() {
    const type = document.getElementById('expense-type').value
    const date = formatDate(document.getElementById('expense-date').value)
    const paymentMethod = document.getElementById('payment-method').value
    const value = parseFloat(document.getElementById('expense-value').value)
    const closingDateInput = document.getElementById('closing-date') // Captura o elemento de data de fechamento da fatura
    const closingDate = formatDate(closingDateInput.value) // Captura o valor da data de fechamento da fatura

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

// function formatDate(inputDate) {
//     let data = new Date(inputDate)
//     let options = { year: 'numeric', month: '2-digit', day: '2-digit' }
//     let formattedDate = data.toLocaleDateString('pt-BR', options)
//     return formattedDate
// }

function formatDate(inputDate) {
    const dateParts = inputDate.split('-')
    const year = dateParts[0]
    const month = dateParts[1]
    const day = dateParts[2]
    return `${day}/${month}/${year}`
}

// Event listener para os botões de exclusão
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
        const id = parseInt(event.target.dataset.id) // Recupera o ID da despesa do atributo data-id
        deleteExpense(id)
    }
})

/* Formata os inputs para duas casas decimais depois da vírgula */
// Seleciona o elemento input
var input = document.querySelector('#expense-value')

// Adiciona um ouvinte de evento 'input' ao elemento
input.addEventListener('input', function (e) {
    // Remove quaisquer caracteres não numéricos
    var num = this.value.replace(/[^0-9]/g, '')

    // Adiciona a vírgula para as duas casas decimais
    num = num.replace(/(\d)(\d{2})$/, '$1,$2')

    // Atualiza o valor do input
    this.value = num.replace(',', '.')
})

// let data = '2023-09-10'
// console.log(formatDate(data)) // Retorna a data no formato DD/MM/AA

document.addEventListener('DOMContentLoaded', function () {
    const closingDateInput = document.getElementById('closing-date') // Captura o elemento de data de fechamento da fatura
    document
        .getElementById('payment-method')
        .addEventListener('change', function () {
            const creditCardFields =
                document.getElementById('credit-card-fields')
            const selectedPaymentMethod = this.value

            if (selectedPaymentMethod === 'C.Crédito') {
                creditCardFields.classList.remove('hidden')
                closingDateInput.setAttribute('required', '')
            } else {
                creditCardFields.classList.add('hidden')
                closingDateInput.removeAttribute('required')
            }
        })
    // // Obtém a data atual no formato "YYYY-MM-DD"
    // const dataAtual = new Date().toISOString().split('T')[0]

    // // Define a data máxima como a data atual
    // document.getElementById('expense-date').max = dataAtual

    // Obtém a data atual
    const dataAtual = new Date()

    // Obtém o ano, mês e dia da data atual
    const ano = dataAtual.getFullYear()
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0')
    const dia = String(dataAtual.getDate()).padStart(2, '0')

    // Formata a data atual no formato "YYYY-MM-DD"
    const dataFormatada = `${ano}-${mes}-${dia}`

    // Define a data máxima como a data atual
    document.getElementById('expense-date').max = dataFormatada
    document.getElementById('closing-date').min = dataFormatada
})
