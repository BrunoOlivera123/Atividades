const express = require('express')
const router = express.Router()
const usuariosController = require('../Controllers/UsuariosControllers')

router.post('/', usuariosController.criarUsuario)

module.exports = router;

