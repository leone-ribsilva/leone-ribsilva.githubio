const expenseForm = document.getElementById('expense-form')
const cancelExpenseButton = document.getElementById('cancel-expense')
const submitExpenseButton = document.getElementById('submit-expense')
const creditCardFields = document.getElementById('credit-card-fields')

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form[action*="sheetmonkey.io"]')
    const paymentMethod = document.querySelector('#payment-method')
    const installmentNumber = document.querySelector('#installments')
    const invoiceClosingDate = document.querySelector('#closing-date')
    const purchaseDate = document.querySelector('#purchase-date')

    installmentNumber.setAttribute('disabled', true)
    invoiceClosingDate.setAttribute('disabled', true)

    paymentMethod.addEventListener('input', function () {
        if (paymentMethod.value === 'cartao-credito') {
            installmentNumber.removeAttribute('disabled')
            invoiceClosingDate.removeAttribute('disabled')
            creditCardFields.style.display = 'block'
        } else {
            installmentNumber.value = 1
            invoiceClosingDate.value = purchaseDate.value
            installmentNumber.setAttribute('disabled', true)
            invoiceClosingDate.setAttribute('disabled', true)
            creditCardFields.style.display = 'none'
        }
    })

    form.addEventListener('submit', function () {
        alert('Despesa cadastrada com sucesso!')
        //window.location.href = 'index.html'
    })
})
cancelExpenseButton.addEventListener('click', function () {
    window.location.href = 'index.html'
})
