const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/clientes', {
        method: 'GET',
        headers: {'Content-Type':'application/json', 'authorization':token}
    })
    .then(res => res.json())
    .then((dados) => {
        resposta.innerHTML = `<table>${thead()}${tbody(dados)}</table>`
    })
    .catch((err) => {
        console.error("Erro ao tentar conectar", err)
        resposta.innerHTML = `Erro ao tentar conectar com servidor.`
    })
})

function thead(){
    let cabecalho = `
    <thead>
        <tr>
            <th>Cód. Cliente</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Endereço</th>
            <th>Telefone</th>
        </tr>
    </thead>
    `

    return cabecalho
}

function tbody(dados){
    let tabela = `<tbody>`
    dados.forEach(element => {
        tabela += `
        <tr>
            <td>${element.codCliente}</td>
            <td>${element.nome}</td>
            <td>${element.email}</td>
            <td>${element.cpf}</td>
            <td>${element.endereco}</td>
            <td>${element.telefone}</td>
        </tr>`
    })
    tabela += `</tbody>`

    return tabela
}