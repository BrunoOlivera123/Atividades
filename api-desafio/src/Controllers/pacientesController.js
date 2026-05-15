const { getConnection, sql } = require("../db/connection");

exports.getPacientes = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM pacientes");

        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.postPacientes = async (req, res) => {
    try {
        const pool = await getConnection();
        const { nome, idade, sexo, telefone } = req.body;

        if (!nome) {
            return res.status(400).json({ erro: "O campo nome é obrigatório." });
        }

        if (idade < 0) {
            return res.status(400).json({ erro: "Idade inválida." });
        }

        if (!["m", "f"].includes(sexo)) {
            return res.status(400).json({ erro: "Sexo inválido. Use 'm' ou 'f'." });
        }

        if (!telefone || telefone.length > 11) {
            return res.status(400).json({ erro: "Telefone inválido." });
        }

        await pool.request()
            .input("nome", sql.VarChar, nome)
            .input("idade", sql.Int, idade)
            .input("sexo", sql.Char, sexo)
            .input("telefone", sql.VarChar, telefone)
            .query(`
                INSERT INTO pacientes (nome, idade, sexo, telefone)
                VALUES (@nome, @idade, @sexo, @telefone)
            `);

        res.status(201).json({ sucesso: `Paciente ${nome} registrado com sucesso.` });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.getPacientesId = async (req, res) => {
    try {
        const pool = await getConnection();
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ erro: "ID não informado." });
        }

        const result = await pool.request()
            .input("id", sql.Int, id)
            .query("SELECT * FROM pacientes WHERE id = @id");

        if (result.recordset.length === 0) {
            return res.status(404).json({ erro: "Paciente não encontrado." });
        }

        res.json(result.recordset);

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.putPacientes = async (req, res) => {
    try {
        const pool = await getConnection();
        const { id, nome, idade, sexo, telefone } = req.body;

        if (!id || !nome || !idade || !sexo || !telefone) {
            return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
        }

        await pool.request()
            .input("id", sql.Int, id)
            .input("nome", sql.VarChar, nome)
            .input("idade", sql.Int, idade)
            .input("sexo", sql.Char, sexo)
            .input("telefone", sql.VarChar, telefone)
            .query(`
                UPDATE pacientes
                SET nome = @nome, idade = @idade, sexo = @sexo, telefone = @telefone
                WHERE id = @id
            `);

        res.json({ sucesso: `Paciente de id ${id} atualizado com sucesso.` });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};