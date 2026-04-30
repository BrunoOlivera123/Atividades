const express = require("express");
const router = express.Router();
const controller = require("../Controllers/usuariosController");

router.get("/", controller.getUsuarios);

router.post("/", controller.postUsuarios);

router.delete("/:id", controller.deleteUsuario);

module.exports = router;
