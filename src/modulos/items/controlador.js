const db = require('../../db/mysql')
const tabla = 'item'



module.exports=function(dbInyectada) {
    let db = dbInyectada
    if(!db){
        db = require('../../db/mysql')
    }


    function todos () {
        return db.todos('item')
    }
    
    function uno (id) {
        return db.uno(tabla, id)
    }
    
    function agregar (body) {
        return db.agregar(tabla, body)
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