const express = require('express');
const router = express.Router();
const localController = require('../controller/localController');

router.get('/', localController.obtenerLocales);

module.exports = router;
