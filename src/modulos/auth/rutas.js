const express = require('express')
const respuesta = require('../../red/respuestas')
const controlador = require('./index')

const router = express.Router()

router.get('/login', login)

async function login(req, res) {
    try {
    const token = await controlador.login(req.body.usuario, req.body.password)
    respuesta.success(req, res, token, 200)
}catch(err){
    console.error('Error fetching items:', err)
    respuesta.error(req, res, 'Internal Server Error', 500)

}

}


module.exports = router;