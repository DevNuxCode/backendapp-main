require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT,
    },
    jwt: {
            secret: process.env.JWT_SECRET || 'notasecreta!'
        },
    
    db: {
            connectionString: process.env.DATABASE_URL,
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
