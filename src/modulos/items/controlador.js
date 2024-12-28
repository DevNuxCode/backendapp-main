const db = require('../../db/postgres.js')
const TABLA = 'item'



module.exports=function(dbInyectada) {
    let db = dbInyectada
    if(!db){
        db = require('../../db/postgres.js')
    }


    const todos = async () => {
        try{
            const { rows } = await db.query(`SELECT * FROM ${TABLA}`)
            return rows
        } catch (error) {
            throw new Error(`Error al obtener ${TABLA}: ${error.message}`);
        }
    }
    
    const uno = async (id) => {
        try {
            const query = {
                text: `SELECT * FROM ${TABLA} WHERE id = $1`,
                values: [id]
            };
            const { rows } = await db.query(query);
            return rows[0];
        } catch (error) {
            throw new Error(`Error al obtener ${TABLA}: ${error.message}`);
        }
    }
    
    const agregar = async (body) => {
        try {
            const query = {
                text: `INSERT INTO ${TABLA}(nombre, descripcion, usuario_id) 
                VALUES($1, $2, $3) RETURNING *`,
                values: [item.nombre, item.descripcion, item.usuario_id]
            };
            const { rows } = await db.query(query);
            return rows[0];
        } catch (error) {
            throw new Error(`Error al agregar ${TABLA}: ${error.message}`);
        }
       
    }
    
    const eliminar = async (id) => {
        try {
            const query = {
                text: `DELETE FROM ${TABLA} WHERE id = $1 RETURNING *`,
                values: [id]
            };
            const { rows } = await db.query(query);
            return rows[0];
        } catch (error) {
            throw new Error(`Error al eliminar ${TABLA}: ${error.message}`);
        }
    }

    const actualizar = async (id, item) => {
        try {
            const query = {
                text: `UPDATE ${TABLA} SET nombre = $1, descripcion = $2, user_id = $3 WHERE id = $4 RETURNING *`,
                values: [item.nombre, item.descripcion, item.user_id, id]
            };
            const { rows } = await db.query(query);
            return rows[0];
        } catch (error) {
            throw new Error(`Error al actualizar ${TABLA}: ${error.message}`);
        }
    };

    return {
        todos,
        uno,
        eliminar,
        actualizar,
        agregar,
    }
    
}