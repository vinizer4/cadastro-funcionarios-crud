/*Utilizando querySelector para armazenar os elementos que serão manipulados*/

/* O método querySelector( ) retorna o primeiro elemento filho que corresponda a um ou mais seletores CSS especificados. Para retornar todas as correspondências */

const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sFoto = document.querySelector('#m-foto')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const sEscopo = document.querySelector('#m-escopo')
const btnSalvar = document.querySelector('#btnSalvar')

// Decladado as variaveis let itens e id
let itens
let id


// Função para pegar os itens do banco através do getItem do banco de dbfunc, se não tiver nada retornará um array vazio
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []

// Função que vai setar os itens da nossa variavei let itens para dentro do banco dbfunc
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

/* Funcão que vai ser executada quando a tela for carregada que vai pegar os itens do nosso banco os dados */
function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
/* Aqui faremos um for em cada dado para que seja criado cada linha, atraves da function insertItens*/
itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

loadItens()

/* Atraves dessa função passamos o item e o index para o nosso banco*/
function insertItem(item, index) {
/* A função createElement() irá criar um elemento HTML para ser, posteriormente, inserido em um documento HTML.

Ex: var element = document.createElement(tagName); */
    let tr = document.createElement('tr')

/* Aqui selecionamos os item que serão inseridos no html atraves do createElement

E adicionameos os botões de editar e 
deletar que irão executadas as funções editItem e deleteItem.

Passando os icones que fizemos a importação do box-icons no nosso html*/
    tr.innerHTML = `
            <td><img id="foto" src="${item.foto}"/></td>
            <td>${item.nome}</td>
            <td>${item.funcao}</td>
            <td>R$ ${item.salario}</td>
            <td class="acao">
                <button onclick="editItem(${index})"><i class='bx   bx-edit' ></i></button>
            </td>
            <td class="acao">
                <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
            </td>
        `
/* Aqui vamos incluindo conforme cada item for carregado pela função insertItens para dentro do nosso body no nosso html, para ser apresentado em tela*/
    tbody.appendChild(tr)

/* A função appendChild() insere um elemento filho (children) ao elemento pai (parent) na última posição, ela auxilia na criação de um elemento DOM.*/
}

function editItem(index) {

    openModal(true, index)
}

function deleteItem(index) {

/* Aqui vamos deletar o item do banco de dados através do método splice, passando o index do item que será deletado e o tamanho do array

.splice()

Resumo
O método splice() altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos.

Sintaxe
array.splice(indice[, deleteCount[, elemento1[, ...[, elementoN]]])

array.splice(indice) // SpiderMonkey/Firefox extension
*/
    itens.splice(index, 1)
/* Aqui vamos atualizar o banco setando os itens do banco de dados através do método setItem, passando o nome do banco de dados e o array itens*/
    setItensBD(itens)
/* Aqui vamos chamar a função loadItens para carregar os itens do banco de dados*/
    loadItens()
}

/* Aqui vamos criar a função openModal 
Quando criarmos um novo item direto no botao incluir não vai se passar nenhum parametro

ao abrir a modal então vai ser adicionado a classe active*/
function openModal(edit = false, index = 0) {

/* Aqui adicinamos a classe active através do método classList.add(), ele adiciona uma classe a um elemento.
*/
    modal.classList.add('active')

/* Aqui cada clique fora da modal ela vai ser 
removido a classe active através do método classList.remove 
E quando removido ela fica como display none e não fica mais visivel em tela*/
    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active');
        }
    }

/* Aqui foi criado uma condição para se for um item de edição ele vai 
carregar para os itens da modal o nome a 
funcao e o salario e vai atribui 
para a variavel id o index do funcionario para ser feito a edição

se não for um item de edição ele 
vai carregar os valores em branco*/
if (edit) {
    sNome.value = itens[index].nome
    sFoto.value = itens[index].foto
    sFuncao.value = itens[index].funcao
    sSalario.value = itens[index].salario
    id = index
    } 
/* se não */    
    else {
        sNome.value = ''
        sFoto.value = ''
        sFuncao.value = ''
        sSalario.value = ''
    }

}

/*Aqui vamos o evento onclick no botão salvar que fica dentro da modal

Ele ira atribuir os valores a nossa tela*/
btnSalvar.onclick = e => {

    if (sNome.value == '' || sFoto.value == '' || sFuncao.value == '' || sSalario.value == '') {
        return
}

e.preventDefault()

/* Se
Se ele vir de uma edição ele vai atualizar o nosso array
com os valores da modal */
    if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].foto = sFoto.value
    itens[id].funcao = sFuncao.value
    itens[id].salario = sSalario.value
    } 
/* Se não 
Caso o contratio ele vamos fazer um push incluindo o novo item no nosso banco
*/
    else {
        itens.push({'nome': sNome.value, 'foto': sFoto.value, 'funcao': sFuncao.value, 'salario': sSalario.value})
    }
/* Aqui vamos atualizar o banco setando os itens do banco de dados através do método setItem, passando o nome do banco de dados e o array itens*/
    setItensBD()
/* Aqui ao fechar a modal vamos remover 
a classe active e atualizar o nosso id como undefined*/
    modal.classList.remove('active')
    loadItens()
    id = undefined
}