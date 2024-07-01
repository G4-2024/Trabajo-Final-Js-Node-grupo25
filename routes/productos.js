const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.get('/',productController.ObtenerTodosLosProductos);

router.get('/:id',productController.ObtenerProductoPorId);

router.post('/',productController.CrearProducto);

router.put('/:id',productController.ActualizarProducto);

router.delete('/:id',productController.BorrarProducto);

module.exports=router;