const Cliente = require('../models/Cliente')

const cryptoJS = require("crypto-js")
const CHAVE_SECRETA = 'proletariado'

const cadastrar = async (req,res) => {
    const valores = req.body

    if(!valores.nome || !valores.email || !valores.senha || !valores.endereco || !valores.telefone || !valores.cpf){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

    if(valores.cpf.length != 11){
        return res.status(400).json({message: "O CPF é inválido!"})
    }

    try{
        valores.cpf = cryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
        valores.senha = cryptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()

        await Cliente.create(valores)
        res.status(201).json({message: "Cadastrado com sucesso!"})
    }catch(err){
        res.status(500).json({message: "Erro ao tentar cadastrar"})
        console.error("Erro ao tentar cadastrar", err)
    }
}

const consultarCodigo = async (req,res) => {
    const valor = req.params.id

    try{
        const cliente = await Cliente.findByPk(valor)

        if(!cliente){
            return res.status(404).json({message: "Cliente não encontrado!"})
        }

        cliente.cpf = cryptoJS.AES.decrypt(cliente.cpf, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)
        cliente.senha = null

        res.status(200).json(cliente)
    }catch(err){
        res.status(500).json({message: "Erro ao tentar consultar"})
        console.error("Erro ao tentar consultar", err)
    }
}

const consultarNome = async (req,res) => {
    const valor = req.params.nome

    try{
        const cliente = await Cliente.findOne({where: {nome: valor}})

        if(!cliente){
            return res.status(404).json({message: "Cliente não encontrado!"})
        }

        cliente.cpf = cryptoJS.AES.decrypt(cliente.cpf, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)
        cliente.senha = null

        res.status(200).json(cliente)
    }catch(err){
        res.status(500).json({message: "Erro ao tentar consultar"})
        console.error("Erro ao tentar consultar", err)
    }
}

const listar = async (req,res) => {
    try{
        const clientes = await Cliente.findAll()

        clientes.forEach(el => {
            el.cpf = cryptoJS.AES.decrypt(el.cpf, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)
            el.senha = null
        })

        res.status(200).json(clientes)
    }catch(err){
        res.status(500).json({message: "Erro ao tentar listar"})
        console.error("Erro ao tentar listar", err)
    }
}

const atualizar = async (req,res) => {
    const valores = req.body
    const valor = req.params.id

    if(!valores.nome || !valores.email || !valores.senha || !valores.endereco || !valores.telefone || !valores.cpf){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

    if(valores.cpf.length != 11){
        return res.status(400).json({message: "O CPF é inválido!"})
    }

    try{
        const cliente = await Cliente.findByPk(valor)

        if(!cliente){
            return res.status(404).json({message: "Cliente não encontrado!"})
        }

        valores.cpf = cryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
        valores.senha = cryptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()

        await cliente.update(valores)
        res.status(200).json({message: "Atualizado com sucesso!"})
    }catch(err){
        res.status(500).json({message: "Erro ao tentar atualizar"})
        console.error("Erro ao tentar atualizar", err)
    }
}

const apagar = async (req,res) => {
    const valor = req.params.id

    try{
        const cliente = await Cliente.findByPk(valor)

        if(!cliente){
            return res.status(404).json({message: "Cliente não encontrado!"})
        }

        await cliente.destroy()
        res.status(200).json({message: "Apagado com sucesso!"})
    }catch(err){
        res.status(500).json({message: "Erro ao tentar apagar"})
        console.error("Erro ao tentar apagar", err)
    }
}

module.exports = { cadastrar, listar, consultarCodigo, consultarNome, atualizar, apagar }