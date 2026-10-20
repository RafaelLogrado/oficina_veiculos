const Veiculo = require('../models/Veiculo')

const cryptoJS = require("crypto-js")
const CHAVE_SECRETA = 'proletariado'

const cadastrar = async (req,res) => {
    const valores = req.body

    if(!valores.modelo || !valores.marca || !valores.placa || !valores.codRastreador || !valores.codCliente){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

    try{
        valores.codRastreador = cryptoJS.AES.encrypt(valores.codRastreador, CHAVE_SECRETA).toString()

        await Veiculo.create(valores)
        res.status(201).json({message: "Cadastrado com sucesso!"})
    }catch(err){
        res.status(500).json({message: "Erro ao tentar cadastrar"})
        console.error("Erro ao tentar cadastrar", err)
    }
}

const consultarCodigo = async (req,res) => {
    const valor = req.params.id

    try{
        const veiculo = await Veiculo.findByPk(valor)

        if(!veiculo){
            return res.status(404).json({message: "Veiculo não encontrado!"})
        }

        res.status(200).json(veiculo)
    }catch(err){
        res.status(500).json({message: "Erro ao tentar consultar"})
        console.error("Erro ao tentar consultar", err)
    }
}

const listar = async (req,res) => {
    try{
        const veiculos = await Veiculo.findAll()

        res.status(200).json(veiculos)
    }catch(err){
        res.status(500).json({message: "Erro ao tentar listar"})
        console.error("Erro ao tentar listar", err)
    }
}

const atualizar = async (req,res) => {
    const valores = req.body
    const valor = req.params.id

    if(!valores.modelo || !valores.marca || !valores.placa || !valores.codRastreador || !valores.codCliente){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

    try{
        const veiculo = await Veiculo.findByPk(valor)

        if(!veiculo){
            return res.status(404).json({message: "Veiculo não encontrado!"})
        }

        valores.codRastreador = cryptoJS.AES.encrypt(valores.codRastreador, CHAVE_SECRETA).toString()

        await veiculo.update(valores)
        res.status(200).json({message: "Atualizado com sucesso!"})
    }catch(err){
        res.status(500).json({message: "Erro ao tentar atualizar"})
        console.error("Erro ao tentar atualizar", err)
    }
}

const apagar = async (req,res) => {
    const valor = req.params.id

    try{
        const veiculo = await Veiculo.findByPk(valor)

        if(!veiculo){
            return res.status(404).json({message: "Veiculo não encontrado!"})
        }

        await veiculo.destroy()
        res.status(200).json({message: "Apagado com sucesso!"})
    }catch(err){
        res.status(500).json({message: "Erro ao tentar apagar"})
        console.error("Erro ao tentar apagar", err)
    }
}

module.exports = { cadastrar, listar, consultarCodigo, atualizar, apagar }