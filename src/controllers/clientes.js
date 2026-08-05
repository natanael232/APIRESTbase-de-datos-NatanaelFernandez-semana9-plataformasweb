
const pool = require('../db/pool');

//CREAR CLIENTES
async function crearCliente(req, res) {
  const { nombre, email, telefono } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email son obligatorios.' });
  }

  try {
    const resultado = await pool.query(
      'INSERT INTO cliente (nombre, email, telefono) VALUES ($1, $2, $3) RETURNING *',
      [nombre, email, telefono || null]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    if (error.code === '23505') { //código PostgreSQL para unique_violation
      return res.status(409).json({ error: 'Ese email ya está registrado.' });
    }
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

// READ todos
async function listarClientes(req, res) {
  const resultado = await pool.query('SELECT * FROM cliente ORDER BY id_cliente');
  res.status(200).json(resultado.rows);
}

// READ - uno
async function obtenerCliente(req, res) {
  const { id } = req.params;
  const resultado = await pool.query('SELECT * FROM cliente WHERE id_cliente = $1', [id]);

  if (resultado.rows.length === 0) {
    return res.status(404).json({ error: 'Cliente no encontrado.' });
  }
  res.status(200).json(resultado.rows[0]);
}

// UPDATE
async function actualizarCliente(req, res) {
  const { id } = req.params;
  const { nombre, email, telefono } = req.body;

  const existe = await pool.query('SELECT * FROM cliente WHERE id_cliente = $1', [id]);
  if (existe.rows.length === 0) {
    return res.status(404).json({ error: 'Cliente no encontrado.' });
  }

  try {
    const resultado = await pool.query(
      'UPDATE cliente SET nombre = $1, email = $2, telefono = $3 WHERE id_cliente = $4 RETURNING *',
      [nombre, email, telefono, id]
    );
    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Ese email ya está registrado por otro cliente.' });
    }
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

// DELETE
async function eliminarCliente(req, res) {
  const { id } = req.params;

  const existe = await pool.query('SELECT * FROM cliente WHERE id_cliente = $1', [id]);
  if (existe.rows.length === 0) {
    return res.status(404).json({ error: 'Cliente no encontrado.' });
  }

  await pool.query('DELETE FROM cliente WHERE id_cliente = $1', [id]);
  res.status(200).json({ mensaje: 'Cliente eliminado.' });
}

module.exports = { crearCliente, listarClientes, obtenerCliente, actualizarCliente, eliminarCliente };