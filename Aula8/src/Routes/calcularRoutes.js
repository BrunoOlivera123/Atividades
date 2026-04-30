const router = require("express").Router();
const calcularController = require("../Controllers/calcularControllers");

router.get("/", calcularController.resultadocalcular);
router.post("/", calcularController.resultadocalcular);

module.exports = router;