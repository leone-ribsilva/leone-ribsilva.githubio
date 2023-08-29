const expenseForm = document.getElementById('expense-form')
const cancelExpenseButton = document.getElementById('cancel-expense')
const submitExpenseButton = document.getElementById('submit-expense')
const creditCardFields = document.getElementById('credit-card-fields')

document.addEventListener('DOMContentLoaded', function () {
    const paymentMethod = document.querySelector('#payment-method')
    const installmentNumber = document.querySelector('#installments')
    const invoiceClosingDate = document.querySelector('#closing-date')
    const purchaseDate = document.querySelector('#purchase-date')

    if (installmentNumber) {
        installmentNumber.setAttribute('disabled', true)
    }
    if (invoiceClosingDate) {
        invoiceClosingDate.setAttribute('disabled', true)
    }

    if (paymentMethod) {
        paymentMethod.addEventListener('input', function () {
            if (paymentMethod.value === 'cartao-credito') {
                creditCardFields.style.display = 'block'
                installmentNumber.removeAttribute('disabled')
                if (invoiceClosingDate) {
                    invoiceClosingDate.removeAttribute('disabled')
                }
            } else {
                if (installmentNumber) {
                    installmentNumber.setAttribute('disabled', true)
                }
                invoiceClosingDate.setAttribute('disabled', true)
                creditCardFields.style.display = 'none'
            }
        })
    }
})
////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    //const submitExpenseButton = document.getElementById('submit-expense')
    if (submitExpenseButton) {
        submitExpenseButton.addEventListener('click', function () {
            event.preventDefault() // Evita o envio do formulário padrão
            const expenseType = document.getElementById('expense-type').value
            const purchaseDate = document.getElementById('purchase-date').value
            const paymentMethod =
                document.getElementById('payment-method').value
            const amount = parseFloat(document.getElementById('amount').value)

            const installments =
                paymentMethod === 'cartao-credito'
                    ? parseInt(document.getElementById('installments').value)
                    : null

            const closingDate =
                paymentMethod === 'cartao-credito'
                    ? document.getElementById('closing-date').value
                    : null

            const expenseData = {
                type: expenseType,
                date: purchaseDate,
                paymentMethod: paymentMethod,
                value: amount,
                installments: installments,
                closingDate: closingDate
            }

            const expensesRef = firestore.collection('expenses') // Referência à coleção 'expenses'

            expensesRef
                .push(expenseData)
                .then(() => {
                    alert('Despesa cadastrada com sucesso!')
                    window.location.href = 'index.html'
                })
                .catch(error => {
                    console.error('Erro ao cadastrar despesa:', error)
                })
        })
    }
})
if (cancelExpenseButton) {
    cancelExpenseButton.addEventListener('click', function () {
        window.location.href = 'index.html'
    })
}
