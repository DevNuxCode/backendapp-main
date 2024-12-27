const { Connection } = require('pg');
const postgress = require('./db/postgress');

require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT,
    },
    jwt: {
            secret: process.env.JWT_SECRET || 'notasecreta!'
        }, postgress: {
            connectionString: process.env.DATABASE_URL,
            ssl:{
                rejectUnauthorized: false,
            }
        }

    //postgress: { //seteamos a nivel de app las variables para conexion de nuestro app con mysql.
        //host: process.env.DB_HOST,
        //user: process.env.DB_USER,
       // password: process.env.DB_PASS,
     //   database: process.env.DB_NAME,

   // }
}