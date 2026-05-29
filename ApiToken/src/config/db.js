const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true'
  }
};

async function getConnection() {
  try {
    const pool = await sql.connect(dbConfig);
    return pool;
  } catch (erro) {
    console.error('Erro ao conectar no banco:', erro);
    throw erro;
  }
}

module.exports = {
  sql,
  getConnection
};
