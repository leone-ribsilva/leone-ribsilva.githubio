const expenseForm = document.getElementById('expense-form')
const cancelExpenseButton = document.getElementById('cancel-expense')
const submitExpenseButton = document.getElementById('submit-expense')
const creditCardFields = document.getElementById('credit-card-fields')
const paymentMethod = document.getElementById('payment-method')
paymentMethod.addEventListener('change', function () {
    if (paymentMethod.value === 'Cartao de credito') {
        creditCardFields.style.display = 'block'
    } else {
        creditCardFields.style.display = 'none'
    }
})

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form[action*="sheetmonkey.io"]')

    form.addEventListener('submit', function (event) {
        //event.preventDefault()
        alert('Despesa cadastrada com sucesso!')
        window.location.href = 'index.html'
    })
})

cancelExpenseButton.addEventListener('click', function () {
    window.location.href = 'index.html'
})
