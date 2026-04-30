const express = require ("express");

const app = express();
app.use(express.json());

app.get("/status",(req,res) =>
    res.json({
    status:"API Funcionando",
    versao:"1.0"
    }
))

const PORT = 3000;
app.listen (PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});

