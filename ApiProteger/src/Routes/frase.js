const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/middlewares');

// Rota protegida por JWT
router.get('/frase', verificarToken, (req, res) => {
    res.send('SO SEI QUE NADA SEI');
});

module.exports = router;
