const express = require('express');
const config = require('./config');
const cors = require('cors')
const morgan = require('morgan')
const app = express();
const error = require('./red/errors')

//load modules 
const items = require('./modulos/items/rutas')
const usuarios = require('./modulos/usuarios/rutas')
const auth = require('./modulos/auth/rutas')


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

// midleware
app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// configuracion del puerto de la app
app.set('port', config.app.port)

//rutas
//Primera Ruta a Clientes
app.use('/api/items', items)
app.use('/api/usuarios', usuarios)
app.use('/api/auth', auth)
app.use(error)





module.exports = app;