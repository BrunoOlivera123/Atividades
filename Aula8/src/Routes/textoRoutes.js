const router = require("express").Router();
const textoController = require("../Controllers/TextoControllers");


router.get('/', textoController.analiseTexto);
router.post('/', textoController.analiseTexto);

module.exports = router;