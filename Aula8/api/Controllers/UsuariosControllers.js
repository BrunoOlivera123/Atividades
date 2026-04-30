exports.criarUsuario = (req, res) => {
  const { nome, email, idade,  } = req.body

// Validação do nome
  if (!nome) {
    return res.status(400).json({
      success: false,
      error: "Nome é obrigatório"
    })
  }

  if (!nome || nome > 3 ) {
    return res.status(400).json({
      success: false,
      error: "Nome com pelo menos 3 letras"
    })
  }

  // Validação do email
  if (!email || !email.includes("@")) {
    return res.status(400).json({
      success: false,
      error: "Email inválido"
    })
  }

 

  // Validação da idade
  if (!idade || idade < 18 ) {
    return res.status(400).json({
      success: false,
      error: "Idade deve ser maior de 18"
    })
  }

 if (!idade) {
  return res.status(400).json({
    success: false,
    error: "Idade não informada"
  });
}

if (idade < 18 || idade > 99) {
  return res.status(400).json({
    success: false,
    error: "A idade deve estar entre 18 e 65 anos"
  });
}

  // Se tudo estiver correto
  return res.status(201).json({
    success: true,
    message: "Usuário criado com sucesso",
    data: { nome, email, idade }
  })
}

