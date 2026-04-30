exports.classificar = (req, res) => {
  const { valor } = req.body;

  const numero = Number(valor);

  if (isNaN(numero)) {
    return res.status(400).json({
      error: "Valor deve ser um número"
    });
  }

  let classificacao;

  if (numero < 50) {
    classificacao = "Reprovado";
  } else if (numero < 70) {
    classificacao = "Recuperação";
  } else {
    classificacao = "Aprovado";
  }

  return res.json({ classificacao });
};