exports.analiseTexto = (req, res) => {
  const { texto } = req.body;

  // Validação
  if (typeof texto !== "string" || texto.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "Texto é obrigatório"
    });
  }

  // Processamento
  const palavras = texto.trim().split(/\s+/);
  const quantidadePalavras = palavras.length;

  const quantidadeCaracteres = texto.length;

  // Resposta
  return res.json({
    quantidadePalavras,
    quantidadeCaracteres,
  });
};