const { Pool } = require('pg');
const config = require('../config')

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  connectionString: config.db.connectionString,
  ssl: {
    require: true,
    rejectUnauthorized: false, // Ajustar según el entorno de despliegue
  },
});

// Función para realizar consultas a PostgreSQL
const query = async (text, params) => {
  try {
    const result = await pool.query(text, params);
    return result.rows; // Devuelve solo las filas de resultados
  } catch (error) {
    console.error('Error ejecutando consulta:', error);
    throw error;
  }
};

// CRUD para la tabla de usuarios
const createUser = async (nombre, apellido, email, passwordHash) => {
  return await query(
    `INSERT INTO usuarios (nombre, apellido, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *`,
    [nombre, apellido, email, passwordHash]
  );
};

const getUserByEmail = async (email) => {
  return await query(`SELECT * FROM usuarios WHERE email = $1`, [email]);
};

const getUserById = async (id) => {
  return await query(`SELECT * FROM usuarios WHERE id = $1`, [id]);
};

// CRUD para la tabla de items
const createItem = async (nombre, descripcion, usuarioId) => {
  return await query(
    `INSERT INTO item (nombre, descripcion, usuario_id) VALUES ($1, $2, $3) RETURNING *`,
    [nombre, descripcion, usuarioId]
  );
};

const getItems = async () => {
  return await query(`SELECT * FROM ${TABLA}  `);
};

const getItemById = async (id) => {
  return await query(`SELECT * FROM item WHERE id = $1`, [id]);
};

const uno = async (tabla, id) => {
  return await query(`SELECT * FROM ${tabla} WHERE id = $1`, [id]);
};
  

const updateItem = async (id, nombre, descripcion) => {
  return await query(
    `UPDATE item SET nombre = $1, descripcion = $2, updated_at = NOW() WHERE id = $3 RETURNING *`,
    [nombre, descripcion, id]
  );
};

const deleteItem = async (id) => {
  return await query(`DELETE FROM item WHERE id = $1 RETURNING *`, [id]);
};

module.exports = {
  query,
  uno,
  createUser,
  getUserByEmail,
  getUserById,
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
};
