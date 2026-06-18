const express = require('express');
const cors = require('cors');
const fraseRouter = require('./Routes/frase');
const authController = require('./Controllers/authController');
const verificarToken = require('./middlewares/middlewares');

const app = express();

app.use(express.json());
app.use(cors());

// Rotas públicas
app.use('/', fraseRouter);
app.post('/register', authController.register);
app.post('/login', authController.login);

// Rota protegida
app.get('/perfil', verificarToken, authController.perfil);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});


