const db = require('../../db/postgress');
const tabla = 'item'

const todos = async () => {
    try {
        const { rows } = await db.query(`SELECT * FROM  ${tabla}`);
        return rows;
    } catch (error) {
        throw new Error('Error al obtener items: ' + error.message);
    }
};

const agregar = async (item) => {
    try {
        const query = {
            text: 'INSERT INTO items(nombre, descripcion, precio, user_id) VALUES($1, $2, $3, $4) RETURNING *',
            values: [item.nombre, item.descripcion, item.precio, item.usuario_id]
        };
        const { rows } = await db.query(query);
        return rows[0];
    } catch (error) {
        throw new Error('Error al agregar item: ' + error.message);
    }
};

module.exports = {
    todos,
    agregar
};