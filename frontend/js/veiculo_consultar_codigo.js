const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const btn_consultar = document.getElementById('btn_consultar')
const resposta = document.getElementById('resposta')

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault()

    const codVeiculo = document.getElementById('codVeiculo').value

    fetch(`http://localhost:3000/veiculo/${codVeiculo}`, {
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
        <td>${el.codVeiculo}</td>
        <td>${el.modelo}</td>
        <td>${el.marca}</td>
        <td>${el.placa}</td>
        <td>${el.codRastreador}</td>
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
                <th>Modelo</th>
                <th>Marca</th>
                <th>Placa</th>
                <th>Cód. Rastreador</th>
                <th>Cliente</th>
            </tr>
        </thead>
    `
}
