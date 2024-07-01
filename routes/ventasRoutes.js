const express = require('express');
const router = express.Router();
const ventasController = require('../controller/ventasController');

// Ruta para crear una nueva venta
router.post('/', ventasController.crearVenta);
router.get('/', ventasController.obtenerVentas);

module.exports = router;
