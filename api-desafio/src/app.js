const express = require('express');
const app = express();

app.use(express.json());

const pacientesRoutes = require("./Routes/pacientesRoutes");
const avaliacoesroutes = require("./Routes/routesAvaliacoes");



app.use("/pacientes", pacientesRoutes);

app.use("/avaliacoes", avaliacoesroutes);

app.listen(3000, () => {
  console.log('ta rodando na PORTA 3000 ✅');
});