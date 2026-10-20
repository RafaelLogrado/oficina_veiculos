const cryptoJS = require("crypto-js")
const CHAVE_SECRETA = 'proletariado'

function authMiddleware(req,res,next){
    const token = req.headers['authorization']

    if(!token){
        return res.status(403).json({message: "Acesso não autorizado!"})
    }

    try{
        const tokenDescriptografado = cryptoJS.AES.decrypt(token, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)

        if(!tokenDescriptografado){
            return res.status(403).json({message: "Token inválido!"})
        }

        const payload = JSON.parse(tokenDescriptografado)

        if(Date.now() > payload.expiraEm){
            return res.status(403).json({message: "Sessão expirada! Faça o login novamente."})
        }

        req.usuario = payload

        next()
    }catch(err){
        console.error("Erro ao autorizar", err)
        return res.status(500).json({message: "Erro ao autorizar"})
    }
    
}

module.exports = authMiddleware