const db = require('../../db/postgress')
const ctrl = require('./controlador')

module.exports = ctrl(db)