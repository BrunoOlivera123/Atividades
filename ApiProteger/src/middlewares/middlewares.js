const jwt = require('jsonwebtoken');
require('dotenv').config();

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      erro: 'Token não informado'
    });
  }

  const partes = authHeader.split(' ');

  if (partes.length !== 2 || partes[0] !== 'Bearer') {
    return res.status(401).json({
      erro: 'Formato do token inválido. Use: Bearer TOKEN'
    });
  }

  const token = partes[1];

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET || 'secret');

    req.usuario = dados;

    next();
  } catch (erro) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
}

module.exports = verificarToken;
