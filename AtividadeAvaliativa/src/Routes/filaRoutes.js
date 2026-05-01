const express = require("express");
const router = express.Router();
const controller = require("../Controllers/filaControlles");

router.get("/", controller.getFila);
router.get("/atendimento", controller.getatendimento);

router.delete("/nome/:nome", controller.deletarNome);
router.delete("/:id", controller.deletarId);

router.post("/", controller.postFila);
router.post("/chamar", controller.postChamarFila);

module.exports = router;