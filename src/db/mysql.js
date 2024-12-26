const mysql = require('mysql2')
const config = require('../config')


// configuramos la conexion a la base de datos desde nuestro archivo .env

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let conexion

function conmysql(){
    conexion = mysql.createConnection(dbconfig)
    conexion.connect((err) => {
        if (err){
            console.log('[database err]', err)
            setTimeout(conmysql, 200)
        }else{
            console.log('DB Conectada satisfactoriamente')
        }
    })
        conexion.on('error', err => {
            console.log('[database err]', err)
            if (err.code==='PROTOCOL_CONNECTION_LOST'){
                conmysql()

            }else{
                throw err
            }

        })
}

conmysql()


//funciones 
function todos(tabla){
    return new Promise((resolve, reject)=> {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result)=>{
           return error ? reject(error) : resolve(result)
        })
    })
 
}

//consultar un registro de item
function uno(tabla, id){
    return new Promise((resolve, reject)=> {
        conexion.query(`SELECT * FROM ${tabla} WHERE  id=${id}`, (error, result)=>{
            return error ? reject(error) : resolve(result)
        })
    })
    
}


//funcion para insertar en la base de datos un item

function agregar(tabla, data){
    return new Promise((resolve, reject)=> {
        conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`, [data,data], (error, result)=>{
            return error ? reject(error) : resolve(result)
        })
})
}




//eliminar un registro de item 
function eliminar(tabla, data){
    return new Promise((resolve, reject)=> {
        conexion.query(`DELETE FROM ${tabla} WHERE  id = ?`, data.id, (error, result)=>{
            return error ? reject(error) : resolve(result)
        })
})
}


function query(tabla, consulta){
    return new Promise((resolve, reject)=> {
        conexion.query(`SELECT * FROM ${tabla} WHERE ? ` , consulta, (error, result) => {
            return error ? reject(error) : resolve(result[0])
        })
})
}

module.exports = {
    todos,
    uno,
    eliminar,
    agregar,
    query
}