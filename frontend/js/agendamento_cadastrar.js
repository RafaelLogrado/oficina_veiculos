const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

let resposta = document.getElementById('resposta')
let btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const data = document.getElementById('data').value
    const hora = document.getElementById('hora').value
    const tipo = document.getElementById('tipo').value
    const codVeiculo = Number(document.getElementById('codVeiculo').value)
    const codCliente = Number(document.getElementById('codCliente').value)

    const valores = {
        data: data,
        hora: hora,
        tipo: tipo,
        codVeiculo: codVeiculo,
        codCliente: codCliente
    }

    fetch('http://localhost:3000/agendamento', {
        method: 'POST',
        headers: {'Content-Type':'application/json', 'authorization': token},
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then((dados) => {
        resposta.innerHTML = dados.message
        document.querySelector('form').reset()
    })
    .catch((err) => {
        console.error("Erro ao tentar conectar", err)
        resposta.innerHTML = `Erro ao tentar conectar com servidor.`
    })
})