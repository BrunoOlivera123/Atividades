const express = require('express');

const app = express();

app.use(express.json());

const filaRoutes = require("./Routes/filaRoutes");
app.use("/fila", filaRoutes);

app.listen(3000, () => {
  console.log('Api Rodando na porta 3000 ✅');
});