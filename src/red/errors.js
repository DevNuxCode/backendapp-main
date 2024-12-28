const respuesta = require('./respuestas')

function errors(err, res, req, next){
    console.error(['error', err])

    const message = err.message || 'Error Interno'
    const status = err.status || 500

    respuesta.error(req, res, message, status )
}

module.exports = errors