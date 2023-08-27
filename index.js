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

    // ID do cliente OAuth 2.0
    const CLIENT_ID =
        '1034505691370-qg6bi0cqf3as7tsqounhads3br928m2v.apps.googleusercontent.com'

    // Escopo da API do Google Sheets
    const SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly'

    // Função para inicializar o cliente JavaScript do Google
    function initClient() {
        gapi.client
            .init({
                clientId: CLIENT_ID,
                scope: SCOPE
            })
            .then(
                function () {
                    // Chame a função readSheetData para ler os dados da planilha e atualizar a tabela
                    readSheetData()
                },
                function (error) {
                    // Exiba um erro se a inicialização falhar
                    console.error('Error: ' + error.details)
                }
            )
    }

    // Carregue o cliente JavaScript do Google e chame a função initClient quando estiver pronto
    gapi.load('client', initClient)

    // ID da planilha do Google Sheets
    const SPREADSHEET_ID = '1EN0SFbArNAqx8y8RShj6bHb_GdEE3jA-gLGP5tLzmzg'

    // Intervalo de células a ser lido (por exemplo, 'A2:E')
    const RANGE = 'A2:F'

    // Função para ler os dados da planilha
    function readSheetData() {
        // Chame a API do Google Sheets para ler os dados da planilha
        gapi.client.sheets.spreadsheets.values
            .get({
                spreadsheetId: SPREADSHEET_ID,
                range: RANGE
            })
            .then(
                function (response) {
                    // Armazene os dados retornados em uma matriz
                    const data = response.result.values

                    // Atualize a tabela com os dados retornados
                    updateTable(data)
                },
                function (response) {
                    // Exiba um erro se a solicitação falhar
                    console.error('Error: ' + response.result.error.message)
                }
            )
    }

    // Função para atualizar a tabela com os dados da planilha
    function updateTable(data) {
        // Selecione o elemento tbody da tabela
        const tbody = document.querySelector('#month-list')

        // Limpe o conteúdo existente da tabela
        tbody.innerHTML = ''

        // Crie uma nova linha para cada linha de dados
        data.forEach(function (row) {
            const tr = document.createElement('tr')

            // Crie uma nova célula para cada coluna de dados
            row.forEach(function (cell) {
                const td = document.createElement('td')
                td.textContent = cell
                tr.appendChild(td)
            })

            // Adicione a linha à tabela
            tbody.appendChild(tr)
        })
    }

    // Chame a função readSheetData para ler os dados da planilha e atualizar a tabela
    readSheetData()
})
