const listaClientes = document.getElementById('lista-clientes')
listaClientes.innerText = "Elemento novo"
console.log(listaClientes)

const mensagem = document.querySelector('#mensagem')
console.log(mensagem)

const formBusca = document.querySelector('#form-busca')
console.log(formBusca)

const inputId = document.querySelector('#cliente-id')
console.log(inputId)

const botaoTodos = document.querySelector('#botao-todos')


const enderecoApi = window.location.protocol === 'file:' ?
    'http://192.168.2.116:3000' : ''

function mostrarClientes(clientes) {

    listaClientes.innerHTML = ''

    clientes.forEach((cliente) => {


        const card = document.createElement('article')
        card.classList.add('cliente')

        const titulo = document.createElement('h2')
        titulo.textContent = cliente.nome

        const id = document.createElement('p')
        id.textContent = `ID: ${cliente.id}`

        const email = document.createElement('p')
        email.textContent = `E-mail: ${cliente.email || 'Não informado'}`

        const idade = document.createElement('p')
        idade.textContent = `Idade: ${cliente.idade || 'Não informado'}`

        card.append(titulo, id, email, idade)
        listaClientes.appendChild(card)
    })
}

async function buscarClientes() {
    mensagem.textContent = 'Carregando clientes...'
    mensagem.classList.remove('erro')

    try {
        const resposta = await fetch(`${enderecoApi}/clientes`)

        if (!resposta.ok) {
            throw new Error('Não foi possível carregar os clientes')
        }

        const clientes = await resposta.json()
        mostrarClientes(clientes)
        mensagem.textContent = `${clientes.length} clientes(s) encontrado(s)`

    }
    catch (erro) {
        listaClientes.innerHTML = ''
        mensagem.textContent = erro.message
        mensagem.classList.add('erro')
    }
}

formBusca.addEventListener('submit', (evento) => {
    evento.preventDefault()

    if (inputId.value) {
        buscarClientesPorId(inputId.value)
    }
})

botaoTodos.addEventListener('click', () => {
    inputId.value = ''
    buscarClientes()
})



