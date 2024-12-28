require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT,
    },
    jwt: {
            secret: process.env.JWT_SECRET || 'notasecreta!'
        },

    mysql: { //seteamos a nivel de app las variables para conexion de nuestro app con mysql.
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,

    }
}