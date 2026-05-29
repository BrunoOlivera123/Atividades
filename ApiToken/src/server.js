const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./Routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API JWT funcionando ✅'
  });
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} ✅`);
});
