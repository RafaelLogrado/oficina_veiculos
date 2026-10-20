let resposta = document.getElementById('resposta')
let btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const cpf = document.getElementById('cpf').value
    const endereco = document.getElementById('endereco').value
    const telefone = document.getElementById('telefone').value

    const valores = {
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf,
        endereco: endereco,
        telefone: telefone
    }

    fetch('http://localhost:3000/cliente', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
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