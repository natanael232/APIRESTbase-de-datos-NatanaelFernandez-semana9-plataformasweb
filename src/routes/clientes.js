// src/routes/clientes.js
const express = require('express');
const router = express.Router();
const controlador = require('../controllers/clientes');

router.post('/', controlador.crearCliente);
router.get('/', controlador.listarClientes);
router.get('/:id', controlador.obtenerCliente);
router.put('/:id', controlador.actualizarCliente);
router.delete('/:id', controlador.eliminarCliente);

module.exports = router;