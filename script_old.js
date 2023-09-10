// Variáveis globais para armazenar despesas e IDs
let expenses = [] // Array de despesas
let currentId = 1 // O Id inicia em 1 e será incrementado

// Função para atualizar a tabela de despesas (mas falta criar a tabela de despesas por mês)
function updateExpenseTable() {
    const tableBody = document.getElementById('expense-table')
    for (const expense of expenses) {
        const row = document.createElement('tr')
        row.innerHTML = `
      <td>${expense.type}</td>
      <td>${expense.date}</td>
      <td>${expense.paymentMethod}</td>
      <td>${expense.installments}</td>
      <td>${expense.closingDate}</td>
      <td>R$ ${expense.value.toFixed(2)}</td>
      <td><button onclick="deleteExpense(${
          expense.id
      })" class="delete-button" data-id="${expense.id}">Excluir</button></td>
      
    `
        // <td><button onclick="deleteExpense(${expense.id})" class="delete-button" data-id="${expense.id}">Excluir</button></td>

        tableBody.appendChild(row)
        console.log('O Id atual é: ', currentId - 1)
    }
    // addDeleteEventListeners()
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
    expenses = expenses.filter(expense => expense.id !== id)
    updateExpenseTable()
    console.log('Deletado com sucesso!')
}

// Função para adicionar uma despesa à lista
function addExpense() {
    const type = document.getElementById('expense-type').value // Captura o tipo de despesa
    const date = document.getElementById('expense-date').value // Captura a data da compra
    const paymentMethod = document.getElementById('payment-method').value // Captura a forma de pagamento
    const value = parseFloat(document.getElementById('expense-value').value) // Captura o valor da despesa
    const closingDate = document.getElementById('closing-date').value // Captura o valor da data de fechamento da fatura

    let expense = {
        //Adiciona os valores capturados acima no array
        id: currentId++,
        type: type,
        date: date,
        paymentMethod: paymentMethod,
        value: value
    }

    // Verifica se a forma de pagamento é Cartão de crédito, caso sim, adiciona o número de parcelas e data de fechamento da fatura no array
    if (paymentMethod === 'cartao-credito') {
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

// function addDeleteEventListeners() {
//     const deleteButtons = document.querySelectorAll('.delete-button')
//     for (const button of deleteButtons) {
//         button.addEventListener('click', function () {
//             const id = parseInt(this.getAttribute('data-id'))
//             expenses = expenses.filter(expense => expense.id !== id)
//             updateExpenseTable()
//         })
//     }
// }

document.addEventListener('DOMContentLoaded', function () {
    // Event listener para o envio do formulário
    document
        .getElementById('expense-form')
        .addEventListener('submit', function (e) {
            e.preventDefault()
            addExpense()
        })

    // Inicializa a tabela de despesas
    updateExpenseTable()

    // Event listener para a mudança na forma de pagamento
    document
        .getElementById('payment-method')
        .addEventListener('change', function () {
            const creditCardFields =
                document.getElementById('credit-card-fields')
            const selectedPaymentMethod = this.value

            if (selectedPaymentMethod === 'cartao-credito') {
                creditCardFields.style.display = 'block'
                console.log('Mudou para block')
            } else {
                creditCardFields.style.display = 'none'
                console.log('Mudou para none')
            }
        })

    // hidePaidMonthsButton.addEventListener('click', function () {
    //     // TODO: Implementar a lógica para ocultar meses pagos
    // })
})
