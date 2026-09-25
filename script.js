// Busca no HTML o elemento que possui o id "lista-clientes".
const listaClientes = document.querySelector('#lista-clientes')
// Busca o parágrafo usado para mostrar mensagens ao usuário.
const mensagem = document.querySelector('#mensagem')
// Busca o formulário usado na pesquisa por ID.
const formBusca = document.querySelector('#form-busca')
// Busca o campo no qual o usuário digita o ID.
const inputId = document.querySelector('#cliente-id')
// Busca o botão utilizado para carregar novamente todos os clientes.
const botaoTodos = document.querySelector('#botao-todos')

// Verifica se a página foi aberta diretamente como um arquivo.
const enderecoApi = window.location.protocol === 'file:'
    // Se foi aberta como arquivo, usa o endereço completo do back-end.
    ? 'http://localhost:3000'
    // Se foi aberta pelo Express, usa o mesmo endereço atual da página.
    : ''

// Recebe uma lista de clientes e mostra cada um deles na página.
function mostrarClientes(clientes) {
    // Apaga os cards antigos antes de exibir o novo resultado.
    listaClientes.innerHTML = ''

    // Percorre o array executando uma vez para cada cliente.
    clientes.forEach((cliente) => {
        // Cria um novo elemento <article> na memória.
        const card = document.createElement('article')
        // Adiciona a classe que estiliza o card no CSS.    
        card.classList.add('cliente')

        // Cria um elemento de título para o nome.
        const titulo = document.createElement('h2')
        // Coloca no título o nome recebido da API.
        titulo.textContent = cliente.nome

        // Cria um parágrafo para o ID.
        const id = document.createElement('p')
        // Junta o texto "ID" ao valor recebido da API.
        id.textContent = `ID: ${cliente.id}`

        // Cria um parágrafo para o e-mail.
        const email = document.createElement('p')
        // Mostra o e-mail ou um texto alternativo se ele não existir.
        email.textContent = `Preço: ${cliente.preco || 'Não informado'}`

        // Cria um parágrafo para a idade.
        const idade = document.createElement('p')
        // Mostra a idade ou um texto alternativo se ela não existir.
        idade.textContent = `Categoria: ${cliente.categoria || 'Não informada'}`

             const estoque = document.createElement('p')
        // Mostra a idade ou um texto alternativo se ela não existir.
        idade.textContent = `Estoque: ${cliente.estoque || 'Não informada'}`

        // Coloca o título e os parágrafos dentro do card.
        card.append(titulo, id, email, idade,  estoque)
        // Coloca o card pronto dentro da lista visível na página.
        listaClientes.appendChild(card)
    })
}

// Declara uma função assíncrona para buscar todos os clientes.
async function buscarClientes() {
    // Informa ao usuário que a requisição começou.
    mensagem.textContent = 'Carregando clientes...'
    // Remove a aparência de erro de uma busca anterior.
    mensagem.classList.remove('erro')

    // O try tenta executar um código que pode gerar erro.
    try {
        // Faz uma requisição GET e espera a resposta da rota /clientes.
        const resposta = await fetch(`${enderecoApi}/produtos`)

        // Verifica se o status HTTP não está entre 200 e 299.
        if (!resposta.ok) {
            // Interrompe o try e envia este erro para o catch.
            throw new Error('Não foi possível carregar os clientes.')
        }

        // Converte o JSON da resposta em um array JavaScript.
        const clientes = await resposta.json()
        console.log(clientes)
        // Cria os cards usando os dados recebidos.
        mostrarClientes(clientes)
        // Informa quantos clientes foram encontrados.
        mensagem.textContent = `${clientes.length} cliente(s) encontrado(s).`
        // O catch recebe qualquer erro ocorrido dentro do try.
    } catch (erro) {
        // Remove resultados antigos para não exibir dados desatualizados.
        listaClientes.innerHTML = ''
        // Exibe para o usuário a mensagem contida no erro.
        mensagem.textContent = erro.message
        // Adiciona a classe que deixa a mensagem vermelha.
        mensagem.classList.add('erro')
    }
}

// Declara uma função assíncrona que recebe o ID procurado.
async function buscarClientePorId(id) {
    // Informa ao usuário que a busca começou.
    mensagem.textContent = 'Buscando cliente...'
    // Remove a aparência de erro de uma busca anterior.
    mensagem.classList.remove('erro')

    // O try tenta executar a requisição.
    try {
        // Faz um GET incluindo o ID digitado no final da URL.
        const resposta = await fetch(`${enderecoApi}/clientes/${id}`)
        // Converte a resposta JSON em um objeto JavaScript.
        const dados = await resposta.json()

        // Verifica se a API respondeu com um status de erro.
        if (!resposta.ok) {
            // Usa a mensagem da API ou uma mensagem padrão.
            throw new Error(dados.erro || 'Não foi possível buscar o cliente.')
        }

        // Coloca o objeto em um array, pois mostrarClientes espera uma lista.
        mostrarClientes([dados])
        // Informa que a busca terminou corretamente.
        mensagem.textContent = 'Cliente encontrado.'
        // O catch recebe erros de conexão ou respostas de erro da API.
    } catch (erro) {
        // Remove os resultados antigos da tela.
        listaClientes.innerHTML = ''
        // Exibe a mensagem do erro capturado.
        mensagem.textContent = erro.message
        // Deixa a mensagem vermelha por meio da classe CSS.
        mensagem.classList.add('erro')
    }
}

// Escuta o evento de envio do formulário.
formBusca.addEventListener('submit', (evento) => {
    // Impede que o navegador recarregue a página.
    evento.preventDefault()

    // Verifica se o usuário digitou um ID.
    if (inputId.value) {
        // Chama a busca passando o valor digitado.
        buscarClientePorId(inputId.value)
    }
})

// Escuta os cliques no botão "Mostrar todos".
botaoTodos.addEventListener('click', () => {
    // Limpa o ID que estava digitado no campo.
    inputId.value = ''
    // Faz uma nova requisição para listar todos os clientes.
    buscarClientes()
})

// Executa a listagem assim que o script é carregado.
buscarClientes()
