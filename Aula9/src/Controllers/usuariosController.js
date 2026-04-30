const { getConnection, sql } = require("../db");

exports.getUsuarios = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Usuarios");

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.postUsuarios = async (req, res) => {
  try {
    const pool = await getConnection();
    var {nome , email} = req.body;
    const result = await pool.request().input("nome", sql.VarChar, nome)
                                       .input("email", sql.VarChar, email)
                                       .query(`INSERT INTO Usuarios (nome, email) VALUES (@nome, @email)`);

    res.json (result.recordset);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const pool = await getConnection();
    const { id } = req.params;

    const result = await pool.request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Usuarios WHERE id = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    res.json({ mensagem: "Usuário deletado com sucesso!" });

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};