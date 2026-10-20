const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const btn_apagar = document.getElementById('btn_apagar')
const resposta = document.getElementById('resposta')

btn_apagar.addEventListener('click', (e) => {
    e.preventDefault()

    const codCliente = document.getElementById('codCliente').value

    fetch(`http://localhost:3000/cliente/${codCliente}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<p>${dados.message}</p>`
    })
    .catch(err => {
        console.error('Erro ao tentar conectar:', err)
        resposta.innerHTML = '<p>Erro ao conectar com o servidor.</p>'
    })
})