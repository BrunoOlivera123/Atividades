const express = require('express');
const router = express.Router();
const avaliacoesController = require('../Controllers/avaliacoesController');
const riscoController = require('../Controllers/RiscoController');


router.post('/', avaliacoesController.criarAvaliacao);
router.get('/', avaliacoesController.listarAvaliacoes);
router.get('/:id', avaliacoesController.buscarAvaliacao);


router.get('/:id/risco', riscoController.calcularRisco);

module.exports = router;