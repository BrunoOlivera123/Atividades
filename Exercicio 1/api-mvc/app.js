const express = require ("express");

const app = express();
app.use(express.json());

app.get("/mensagem",(req,res) =>
    res.json({
        mensagem:"Bem vindo a API",
    })
)
app.get("/curso",(req,res) =>
    res.json({
        nome:"Desenvolvimento web", 
        carga_horaria: 120
    })
)


const PORT = 3000;
app.listen (PORT, () => {
    console.log(`API Rodando ${PORT}`);
});


