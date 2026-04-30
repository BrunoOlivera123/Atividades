const router = require("express").Router();
const alunosController = require ("../controllers/alunosController");

// GET http://localhost;3000/alunos
router.get("/", alunosController.listar);

//POST HTTP://localhost:300/alunos
router.post("/", alunosController.criar);

module.exports = router;