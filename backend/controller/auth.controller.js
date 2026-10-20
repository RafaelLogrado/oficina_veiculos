const Cliente = require('../models/Cliente')

const cryptoJS = require("crypto-js")
const CHAVE_SECRETA = 'proletariado'

const login = async (req,res) => {
    const valores = req.body

    try{
        const cliente = await Cliente.findOne({where: {email: valores.email}})

        if(!cliente){
            return res.status(404).json({message: "Cliente não encontrado!"})
        }

        const senhaBD = cryptoJS.AES.decrypt(cliente.senha, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)

        if(valores.senha !== senhaBD){
            return res.status(401).json({message: "Senha incorreta!"})
        }

        const tempoExpira = Date.now() + (3600000 * 3)   // 3 horas

        const payload = {
            codCliente: cliente.codCliente,
            expiraEm: tempoExpira,
            nome: cliente.nome
        }


        const token = cryptoJS.AES.encrypt(JSON.stringify(payload), CHAVE_SECRETA).toString()

        res.status(200).json({
            message: "Login realizado com sucesso!",
            token: token,
            nome: cliente.nome
        })

    }catch(err){
        res.status(500).json({message: "Erro ao realizar login!"})
        console.error("Erro ao realizar login!", err)
    }
}

module.exports = { login }