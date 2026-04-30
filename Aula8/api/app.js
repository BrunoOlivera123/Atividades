const express = require('express');

const app = express();

app.use(express.json());

const usuariosroutes = require('./Routers/UsuariosRoutes');

app.use ('/usuarios', usuariosroutes);

const loginroutes = require('./Routers/LoginRoutes');

app.use('/login', loginroutes);

app.listen(3000, () => {
  console.log('Tudo certo 👌 Ta rodando na 3000')
})
