const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

let resposta = document.getElementById('resposta')
let btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const modelo = document.getElementById('modelo').value
    const marca = document.getElementById('marca').value
    const placa = document.getElementById('placa').value
    const codRastreador = document.getElementById('codRastreador').value
    const codCliente = Number(document.getElementById('codCliente').value)

    const valores = {
        modelo: modelo,
        marca: marca,
        placa: placa,
        codRastreador: codRastreador,
        codCliente: codCliente
    }

    fetch('http://localhost:3000/veiculo', {
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