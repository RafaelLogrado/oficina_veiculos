const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/agendamentos', {
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
            <th>Cód. Agendamento</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Tipo</th>
            <th>Cód. Veículo</th>
            <th>Cód. Cliente</th>
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
            <td>${element.codAgendamento}</td>
            <td>${element.data}</td>
            <td>${element.hora}</td>
            <td>${element.tipo}</td>
            <td>${element.codVeiculo}</td>
            <td>${element.codCliente}</td>
        </tr>`
    })
    tabela += `</tbody>`

    return tabela
}