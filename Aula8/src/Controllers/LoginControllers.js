exports.validacaologin = (req, res) => {
  const { usuario, senha } = req.body

  if (usuario === "admin" && senha === "1234") {
    return res.json({
      sucesso: true,
      mensagem: "Login realizado com sucesso"
    })
  }

  return res.status(400).json({
    sucesso: false,
    mensagem: "Usuário ou senha inválidos"
  })
}



//no futuro limitar a 4 caracteres!
//senha com apenas numeros!