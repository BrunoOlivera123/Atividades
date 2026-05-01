const express = require('express');
const app = express();

app.use(express.json());

let fila = [];
let atendimentoAtual = null;
let contadorId = 1;

exports.postFila = (req, res) => {
    const { nome } = req.body;
    if (!nome) {
        return res.status(400).json({ erro: 'Escreva um nome'})
    }
    const id = contadorId++;
    fila.push({ id, nome });

    res.json({
        mensagem: `${nome} Entrou na fila`,
        fila
    });
};

exports.getFila = ( req, res) => {
    res.json({ fila });
};

exports.postChamarFila = (req, res) => {
    if (fila.length === 0) {
        return res.status(400).json({ erro: 'Nao tem ninguem na fila'});
    }
    
    atendimentoAtual = fila.shift();

    res.json({
        mensagem: `Chamando ${atendimentoAtual}`,
        atendimentoAtual,
        fila
    });
};

exports.deletarId = (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const index = fila.findIndex(p => p.id === id);

        if (index === -1) {
            return res.status(404).json({ erro: "id_nao_encontrado" });
        }

        const removido = fila.splice(index, 1);

        res.json({
            mensagem: `${removido[0].nome} com ID ${id} foi removido da fila ! ✅`,
            fila
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: error.message });
    }
};

exports.getatendimento = (req, res) => {
    if (!atendimentoAtual) {
        return res.status(400).json({ erro: 'Ninguem sendo atendido no momento' });
    }

    res.json({ atendimentoAtual });
};
exports.deletarNome = (req, res) => {
  try {
    const { nome } = req.params;

    if (!nome) {
      return res.status(400).json({ erro: "Coloque um nome" });
    }
    const index = fila.findIndex(fila => fila.nome === nome);
    if (index === -1) {
      return res.status(404).json({ erro: "nome_nao_encontrado" });
    }
    fila.splice(index, 1);
    res.json({ mensagem: `${nome} foi removido da fila`, fila });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
};

