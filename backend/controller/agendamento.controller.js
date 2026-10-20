const Agendamento = require('../models/Agendamento')

const cryptoJS = require("crypto-js")
const CHAVE_SECRETA = 'proletariado'

const cadastrar = async (req,res) => {
    const valores = req.body

    if(!valores.data || !valores.hora || !valores.tipo || !valores.codVeiculo || !valores.codCliente){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

    try{
        await Agendamento.create(valores)
        res.status(201).json({message: "Cadastrado com sucesso!"})
    }catch(err){
        res.status(500).json({message: "Erro ao tentar cadastrar"})
        console.error("Erro ao tentar cadastrar", err)
    }
}

const consultarCodigo = async (req,res) => {
    const valor = req.params.id

    try{
        const agendamento = await Agendamento.findByPk(valor)

        if(!agendamento){
            return res.status(404).json({message: "Agendamento não encontrado!"})
        }

        res.status(200).json(agendamento)
    }catch(err){
        res.status(500).json({message: "Erro ao tentar consultar"})
        console.error("Erro ao tentar consultar", err)
    }
}

const listar = async (req,res) => {
    try{
        const agendamentos = await Agendamento.findAll()

        res.status(200).json(agendamentos)
    }catch(err){
        res.status(500).json({message: "Erro ao tentar listar"})
        console.error("Erro ao tentar listar", err)
    }
}

const atualizar = async (req,res) => {
    const valores = req.body
    const valor = req.params.id

    if(!valores.data || !valores.hora || !valores.tipo || !valores.codVeiculo || !valores.codCliente){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

    try{
        const agendamento = await Agendamento.findByPk(valor)

        if(!agendamento){
            return res.status(404).json({message: "Agendamento não encontrado!"})
        }

        await agendamento.update(valores)
        res.status(200).json({message: "Atualizado com sucesso!"})
    }catch(err){
        res.status(500).json({message: "Erro ao tentar atualizar"})
        console.error("Erro ao tentar atualizar", err)
    }
}

module.exports = { cadastrar, listar, consultarCodigo, atualizar }