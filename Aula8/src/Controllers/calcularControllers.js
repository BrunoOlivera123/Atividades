exports.resultadocalcular = (req, res) => {
  const { tipo, n1, n2 } = req.query;

  const num1 = Number(n1);
  const num2 = Number(n2);

  let resultado;

  if (tipo === "soma") {
    resultado = num1 + num2;
  } else if (tipo === "subtracao") {
    resultado = num1 - num2;
  } else if (tipo === "multiplicacao") {
    resultado = num1 * num2;
  } else if (tipo === "divisao") {
    resultado = num1 / num2;
  } else {
    return res.status(400).json({
      error: "Tipo de operação inválido"
    });
  }

  return res.json({ resultado });
};