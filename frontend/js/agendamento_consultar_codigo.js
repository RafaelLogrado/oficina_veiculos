const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const btn_consultar = document.getElementById('btn_consultar')
const resposta = document.getElementById('resposta')

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault()

    const codAgendamento = document.getElementById('codAgendamento').value

    fetch(`http://localhost:3000/agendamento/${codAgendamento}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(res => res.json())
        .then(dados => {
            if (dados.message) {
                resposta.innerHTML = `<p>${dados.message}</p>`
            } else {
                resposta.innerHTML = ''
                resposta.innerHTML += `
                <table>
                    ${criarThead()}
                    ${criarTbody([dados])}
                </table>
                `
            }
        })
        .catch(err => {
            console.error('Erro ao tentar conectar:', err)
            resposta.innerHTML = '<p>Erro ao conectar com o servidor.</p>'
        })
})

function criarTbody(dados) {
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += `<tr>
        <td>${el.codAgendamento}</td>
        <td>${el.data}</td>
        <td>${el.hora}</td>
        <td>${el.tipo}</td>
        <td>${el.codVeiculo}</td>
        <td>${el.codCliente}</td>
        </tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead() {
    return `
        <thead>
            <tr>
                <th>Código</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Tipo</th>
                <th>Cód. Veículo</th>
                <th>Cód. Cliente</th>
            </tr>
        </thead>
    `
}
