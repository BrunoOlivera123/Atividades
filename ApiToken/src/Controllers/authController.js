const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sql, getConnection } = require('../config/db');
require('dotenv').config();

async function register(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        erro: 'Nome, email e senha são obrigatórios'
      });
    }

    const pool = await getConnection();

    const usuarioExistente = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT id FROM Usuarios WHERE email = @email');

    if (usuarioExistente.recordset.length > 0) {
      return res.status(400).json({
        erro: 'Email já cadastrado'
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await pool.request()
      .input('nome', sql.VarChar, nome)
      .input('email', sql.VarChar, email)
      .input('senha_hash', sql.VarChar, senhaHash)
      .query(`
        INSERT INTO Usuarios (nome, email, senha_hash)
        VALUES (@nome, @email, @senha_hash)
      `);

    return res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso'
    });

  } catch (erro) {
    console.error(erro);
    return res.status(500).json({
      erro: 'Erro interno ao cadastrar usuário'
    });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        erro: 'Email e senha são obrigatórios'
      });
    }

    const pool = await getConnection();

    const resultado = await pool.request()
      .input('email', sql.VarChar, email)
      .query(`
        SELECT id, nome, email, senha_hash
        FROM Usuarios
        WHERE email = @email
      `);

    if (resultado.recordset.length === 0) {
      return res.status(401).json({
        erro: 'Email ou senha inválidos'
      });
    }

    const usuario = resultado.recordset[0];

    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senha_hash
    );

    if (!senhaCorreta) {
      return res.status(401).json({
        erro: 'Email ou senha inválidos'
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
      }
    );

    return res.json({
      mensagem: 'Login realizado com sucesso',
      token
    });

  } catch (erro) {
    console.error(erro);
    return res.status(500).json({
      erro: 'Erro interno ao fazer login'
    });
  }
}

async function perfil(req, res) {
  return res.json({
    mensagem: 'Rota protegida acessada com sucesso',
    usuario: req.usuario
  });
}


module.exports = {
  register,
  login,
  perfil
};
