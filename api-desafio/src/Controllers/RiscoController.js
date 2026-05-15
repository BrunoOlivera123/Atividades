exports.calcularRisco = async (req, res) => {
    try {
        const { getConnection, sql } = require('../db/connection');

        const pool = await getConnection();

        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query(`
                SELECT 
                    a.*,
                    p.sexo
                FROM Avaliacoes a
                INNER JOIN Pacientes p
                    ON a.paciente_id = p.id
                WHERE a.id = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ erro: "Avaliação não encontrada" });
        }

        const dados = result.recordset[0];

        let pontos = 0;
        const imc = dados.peso / (dados.altura * dados.altura);

        let criterios = [];

        if (imc >= 30) {
            pontos += 2;
            criterios.push("IMC >= 30");
        }

        if (dados.pressao_sistolica >= 140) {
            pontos += 2;
            criterios.push("Pressão sistólica >= 140");
        }

        if (dados.pressao_diastolica >= 90) {
            pontos += 2;
            criterios.push("Pressão diastólica >= 90");
        }

        if (dados.sexo === 'm' && dados.cintura >= 102) {
            pontos += 1;
            criterios.push("Cintura homem >= 102");
        }

        if (dados.sexo === 'f' && dados.cintura >= 88) {
            pontos += 1;
            criterios.push("Cintura mulher >= 88");
        }

        let risco = "Baixo";
        if (pontos >= 2 && pontos <= 3) risco = "Médio";
        if (pontos >= 4) risco = "Alto";

        res.json({
            avaliacao_id: dados.id,
            imc: Number(imc.toFixed(2)),
            pontos,
            risco,
            criterios
        });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};