const express = require ("express");

const app = express();

// Permite receber JSON no body(POST/PUT)
app.use (express.json());

//Rotas (Modulos)
const alunosRoutes = require ("./routes/alunosRoutes");
//const produtosRoutes = require ("./routes/produtosRoutes");

//Prefixos das rotas
app.use ("/alunos", alunosRoutes);
//app.use ("/produtos", produtosRoutes);

// Rota de teste/boas-vindasa
app.get ("/", (req, res ) => {
    res.send ("API MVC Funcionando ");
});

module.exports = app;




