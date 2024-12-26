const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('../middleware/errors')

const secret = config.jwt.secret

function asignarToken(data){
    return jwt.sign(data, secret)
}

function verificarToken(token){
    return jwt.verify(token, secret)
}

const chequearToken = {
    confirmarToken: function(req, id){
        const decode = decodeCabecera(req)

     if(decode.id !== id){
       throw error("No tienes privilegios para hacer esto", 401);
        
     }
    }
}

function obtenerToken(authorization){
    if(!authorization) {
        throw error("No viene Token", 401);
        
    }
    if(authorization.indexOf('Bearer') === -1){
        throw error('Formato Invalido', 401)
    }

    let token = authorization.replace('Bearer ', '')
    return token

}

function decodeCabecera(req){
    const authorization = req.headers.authorization || ''
    const token = obtenerToken(authorization)
    const decode = verificarToken(token)

    req.user= decode

    return decode
}

module.exports = {
    asignarToken,
    chequearToken
}