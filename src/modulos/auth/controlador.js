const db = require('../../db/postgres.js')

const bcrypt = require('bcrypt')
const auth = require('../../auth')

const tabla = 'auth'


module.exports=function(dbInyectada) {

    let db = dbInyectada
    if(!db){
        db = require('../../db/postgres.js')
    }

    async function login(usuario, password){
        const data = await db.query(tabla, {usuario: usuario})

    
        return bcrypt.compare(password, data.password).then(resultado=>{
                if(resultado === true){
                    //generar token
                    return auth.asignarToken({ ...data})

                }else{
                    throw new Error ('Informacion Invalida')
                }
            })
    }


    async function agregar (data) {
        //console.log('data', data)
        const authData = {
            id: data.id

        }

        if(data.usuario){
            authData.usuario = data.usuario
        }
        if(data.password){
            authData.password = await bcrypt.hash(data.password.toString(), 5)
        }

        return db.agregar(tabla, authData)
    }
    
    
    return {
        
        agregar,
        login
    }
    
}