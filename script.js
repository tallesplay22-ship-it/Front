const listaClientes = document.getElementById('lista-clientes')
// listaClientes.innerHTML = "Elemento Novo"
console.log(listaClientes)

const mensagem = document.querySelector('#mensagem')
console.log(mensagem)

const formBusca = document.querySelector('#form-busca')
console.log(formBusca)

const inputId = document.querySelector('#cliente-id')
console.log(inputId)

const enderecoApi = window.location.protocol === 'file' ? 'http://localhost:3000' : ''

function mostrarClientes(clientes){

    listaClientes.innerHTML = ''

    clientes.forEach((cliente) => {
        
    
        const card = document.createElement('article')
        card.classList.add('cliente')

        const titulo = document.createElement('h2')
        titulo.textContent = clientes.nome

        const id = document.createElement('p')
        id.textContent = `ID: ${cliente.id}`
    });
}