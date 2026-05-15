const express = require('express');
const router = express.Router();
const riscoController = require('../Controllers/RiscoController');

router.get('/:id', riscoController.calcularRisco);

module.exports = router;