const express = require("express");
const router = express.Router();
const pacientesController = require("../controllers/pacientesController");

router.get("/", pacientesController.getPacientes);
router.post("/", pacientesController.postPacientes);
router.get("/:id", pacientesController.getPacientesId);
router.put("/:id", pacientesController.putPacientes);

module.exports = router;
