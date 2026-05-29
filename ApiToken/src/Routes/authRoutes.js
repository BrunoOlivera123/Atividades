const express = require('express');
const router = express.Router();

const authController = require('../Controllers/authController');
const verificarToken = require('../middlewares/middlewares');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/perfil', verificarToken, authController.perfil);

module.exports = router;
