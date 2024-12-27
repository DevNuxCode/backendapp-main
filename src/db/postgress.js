const { Pool } = require('pg');
const config = require('../config')
const tabla = 'item'

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        require: true
    }
});


// Función para probar la conexión
const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Conexión exitosa a PostgreSQL');
        client.release();
    } catch (error) {
        console.error('Error conectando a PostgreSQL:', error.message);
    }
};

// Probar conexión al iniciar
testConnection();

//funciones 
function todos(tabla){
    return new Promise((resolve, reject)=> {
        db.query(`SELECT * FROM ${tabla}`, (error, result)=>{
           return error ? reject(error) : resolve(result)
        })
    })
 
}

//consultar un registro de item
function uno(tabla, id){
    return new Promise((resolve, reject)=> {
        db.query(`SELECT * FROM ${tabla} WHERE  id=${id}`, (error, result)=>{
            return error ? reject(error) : resolve(result)
        })
    })
    
}


//funcion para insertar en la base de datos un item

function agregar(tabla, data){
    return new Promise((resolve, reject)=> {
        db.query(`INSERT INTO ${tabla}(name, usuario, password, activo, user_id) VALUES ($1, $2, $3, $4, $5) ON DUPLICATE KEY UPDATE ?`, [data.name, data.usuario, data.password, data.activo, data.user_id], (error, result)=>{
            return error ? reject(error) : resolve(result)
        })
})
}




//eliminar un registro de item 
function eliminar(tabla, data){
    return new Promise((resolve, reject)=> {
        db.query(`DELETE FROM ${tabla} WHERE  id = ?`, data.id, (error, result)=>{
            return error ? reject(error) : resolve(result)
        })
})
}


function query(tabla, consulta){
    return new Promise((resolve, reject)=> {
        db.query(`SELECT * FROM ${tabla} WHERE ? ` , consulta, (error, result) => {
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



module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
}; 