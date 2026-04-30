const express = require ("express");

const app = express();

app.use (express.json());

const usuariosRoutes = require("./Routes/UsuariosRoutes");

app.use("/usuarios", usuariosRoutes);

const loginRoutes = require("./Routes/loginRoutes");

app.use("/login", loginRoutes);

const textoRoutes = require("./Routes/textoRoutes");

app.use("/texto", textoRoutes);

const calcularRoutes = require("./Routes/calcularRoutes");

app.use("/calcular", calcularRoutes);

const classificarRoutes = require("./Routes/classificarRoutes");

app.use("/classificar", classificarRoutes);

const erroRoutes = require("./Routes/erroRoutes");

app.use("/erro", erroRoutes);

const PORT = 3000;
app.listen (PORT, ()  => {
    console.log(`Ta Rodando Fiiiihhhhhhh ${PORT}KM por minuto kkkkk`);
});