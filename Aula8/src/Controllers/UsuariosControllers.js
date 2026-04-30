const usuarios = [];

exports.criarUsuario = (req, res) => {
  const { nome, email, idade, telefone } = req.body


 if (
  typeof nome !== "string" ||
  nome.trim().length < 3 ||
  !/^[A-Za-zÀ-ÿ\s]+$/.test(nome)
) {
  return res.status(400).json({
    success: false,
    error: "Nome deve ter no mínimo 3 letras e conter apenas letras"
  })
}

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailValido) {
    return res.status(400).json({
      success: false,
      error: "Email inválido"
    })
  }

  if (!idade || idade <18) {
    return res.status(400).json ({
      success:false,
      error: "Tu é de menor carai, sai daqui"
    })
  }
  
  if (!/^\d{11}$/.test(telefone)) {
    return res.status(400).json ({
      success:false,
      error: "Sai daqui mentiroso! Numero invalido!"
    })
}
  
  const novoUsuario = { nome, email, idade, telefone }
  usuarios.push(novoUsuario)

  return res.status(201).json({
    success: true,
    message: "Usuário criado com sucesso",
    data: novoUsuario
  })
}

exports.listarUsuarios = (req, res) => {
  return res.json({
    success: true,
    message: "Lista de usuários",
    data: usuarios
  })
}
  exports.listarTelefones = (req, res) => {
  const telefones = usuarios.map(user => ({
    nome: user.nome,
    telefone: user.telefone
  }))    

  return res.json({
    success: true,
    message: "Lista de telefones",
    data: telefones
  })
}