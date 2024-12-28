const db = require('../../db/postgres.js')
const ctrl = require('./controlador')

module.exports = ctrl(db)