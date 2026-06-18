const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Armazenamento em memória simples
const users = [];
let nextId = 1;

function register(req, res) {
  try {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
      return res.status(400).json({ erro: 'Usuário e senha são obrigatórios' });
    }

    const existing = users.find(u => u.usuario === usuario);
    if (existing) return res.status(400).json({ erro: 'Usuário já cadastrado' });

    const senha_hash = bcrypt.hashSync(senha, 10);
    users.push({ id: nextId++, usuario, senha_hash });

    return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno ao cadastrar usuário' });
  }
}

function login(req, res) {
  try {
    const { usuario, senha } = req.body;
    if (!usuario || !senha) return res.status(400).json({ erro: 'Usuário e senha são obrigatórios' });

    const user = users.find(u => u.usuario === usuario);
    if (!user) return res.status(401).json({ erro: 'Usuário ou senha inválidos' });

    const ok = bcrypt.compareSync(senha, user.senha_hash);
    if (!ok) return res.status(401).json({ erro: 'Usuário ou senha inválidos' });

    const token = jwt.sign({ id: user.id, usuario: user.usuario }, process.env.JWT_SECRET || 'secret', { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });

    return res.json({ mensagem: 'Login realizado com sucesso', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno ao fazer login' });
  }
}

function perfil(req, res) {
  return res.send('SO SEI QUE NADA SEI');
}

module.exports = { register, login, perfil };
