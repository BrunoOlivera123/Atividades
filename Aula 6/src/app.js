const express = require("express");

const usuariosRoutes = require("./routes/usuarios");
const helloRoutes = require("./routes/hello");

const app = express();

// middleware para JSON
app.use(express.json());

// rotas da aplicação
app.use("/usuarios", usuariosRoutes);
app.use("/hello", helloRoutes);

module.exports = app;

