const db = require('../../db/mysql')
const auth = require('../auth')
const tabla = 'usuarios'



module.exports=function(dbInyectada) {
    let db = dbInyectada
    if(!db){
        db = require('../../db/mysql')
    }


    function todos () {
        return db.todos('usuarios')
    }
    
    function uno (id) {
        return db.uno(tabla, id)
    }
    
    async function agregar (body) {
        const usuario = {
            id: body.id,
            nombre: body.nombre,
            activo: body.activo
        }
        const respuesta = await db.agregar(tabla, usuario)
        var insertId = 0
        if (body.id == 0){
            insertId= respuesta.insertId
        }else{
            insertId = body.id
        }
        var respuesta2 = ''
        if(body.usuario || body.password){
            respuesta2 = await auth.agregar({
                id: insertId,
                usuario: body.usuario,
                password: body.password
            })
        }
    }
    
    function eliminar (body) {
        return db.eliminar(tabla, body)
    }
    return {
        todos,
        uno,
        eliminar,
        agregar,
    }
    
}