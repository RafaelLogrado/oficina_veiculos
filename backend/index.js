const express = require("express")
const app = express()
const cors = require('cors')

require('./models/rel')

const hostname = 'localhost'
const PORT = 3000
const conn = require('./db/conn')

const authMiddleware = require('./middleware/auth.middleware')
const clienteController = require('./controller/cliente.controller')
const veiculoController = require('./controller/veiculo.controller')
const agendamentoController = require('./controller/agendamento.controller')
const authController = require('./controller/auth.controller')


// ----- Middleware -----

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

// ----- Rotas -----

app.get('/', (req,res) => {
    res.status(200).json({message: "Aplicação rodando!"})
})

app.post('/cliente', clienteController.cadastrar)
app.post('/login', authController.login)

// Rotas Privadas
app.use(authMiddleware)

app.get('/clientes', clienteController.listar)
app.get('/cliente/:id', clienteController.consultarCodigo)
app.get('/cliente/buscarNome/:nome', clienteController.consultarNome)
app.put('/cliente/:id', clienteController.atualizar)
app.delete('/cliente/:id', clienteController.apagar)

app.post('/veiculo', veiculoController.cadastrar)
app.get('/veiculos', veiculoController.listar)
app.get('/veiculo/:id', veiculoController.consultarCodigo)
app.put('/veiculo/:id', veiculoController.atualizar)
app.delete('/veiculo/:id', veiculoController.apagar)

app.post('/agendamento', agendamentoController.cadastrar)
app.get('/agendamentos', agendamentoController.listar)
app.get('/agendamento/:id', agendamentoController.consultarCodigo)
app.put('/agendamento/:id', agendamentoController.atualizar)

// ----- Servidor -----
conn.sync()
.then(() => {
    app.listen(PORT, hostname, ()=> {
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error("Erro ao conectar com servidor", err)
})