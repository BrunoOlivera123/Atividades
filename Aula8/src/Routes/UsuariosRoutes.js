const router = require("express").Router();
const usuariosController = require("../Controllers/UsuariosControllers");


router.post('/', usuariosController.criarUsuario);
router.get('/', usuariosController.listarUsuarios);

module.exports = router;