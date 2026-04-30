const router = require("express").Router();
const erroController = require("../Controllers/erroControllers");


router.get('/', erroController.erro);
router.post('/', erroController.erro);

module.exports = router;