const { sql, getConnection } = require('../db/connection');

// Função de cálculo de IMC
function calcularIMC(peso, altura) {
    const imc = peso / (altura * altura);

    let classificacao = '';

    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
    } else if (imc < 25) {
        classificacao = 'Peso normal';
    } else if (imc < 30) {
        classificacao = 'Sobrepeso';
    } else {
        classificacao = 'Obesidade';
    }

    return {
        imc: Number(imc.toFixed(2)),
        classificacao
    };
}

// Criar avaliação
async function criarAvaliacao(req, res) {
    const {
        paciente_id,
        peso,
        altura,
        cintura,
        pressao_sistolica,
        pressao_diastolica
    } = req.body;

    try {
        if (!paciente_id || !peso || !altura) {
            return res.status(400).json({
                sucesso: false,
                erro: 'Paciente, peso e altura são obrigatórios'
            });
        }

        if (peso <= 0 || altura <= 0) {
            return res.status(400).json({
                sucesso: false,
                erro: 'Peso e altura devem ser maiores que zero'
            });
        }

        const pool = await getConnection();

        // Verifica se paciente existe
        const paciente = await pool.request()
            .input('id', sql.Int, paciente_id)
            .query('SELECT * FROM Pacientes WHERE id = @id');

        if (paciente.recordset.length === 0) {
            return res.status(404).json({
                sucesso: false,
                erro: 'Paciente não encontrado'
            });
        }

        await pool.request()
            .input('paciente_id', sql.Int, paciente_id)
            .input('peso', sql.Decimal(5, 2), peso)
            .input('altura', sql.Decimal(3, 2), altura)
            .input('cintura', sql.Decimal(5, 2), cintura)
            .input('ps', sql.Int, pressao_sistolica)
            .input('pd', sql.Int, pressao_diastolica)
            .query(`
                INSERT INTO Avaliacoes (
                    paciente_id,
                    peso,
                    altura,
                    cintura,
                    pressao_sistolica,
                    pressao_diastolica
                )
                VALUES (
                    @paciente_id,
                    @peso,
                    @altura,
                    @cintura,
                    @ps,
                    @pd
                )
            `);

        res.status(201).json({
            sucesso: true,
            mensagem: 'Avaliação cadastrada com sucesso'
        });

    } catch (err) {
        res.status(500).json({
            sucesso: false,
            erro: err.message
        });
    }
}

// Listar avaliações
async function listarAvaliacoes(req, res) {
    try {
        const pool = await getConnection();

        const result = await pool.request().query(`
            SELECT
                a.*,
                p.nome AS nome_paciente
            FROM Avaliacoes a
            INNER JOIN Pacientes p
                ON a.paciente_id = p.id
        `);

        res.status(200).json({
            sucesso: true,
            dados: result.recordset
        });

    } catch (err) {
        res.status(500).json({
            sucesso: false,
            erro: err.message
        });
    }
}

// Buscar avaliação por ID
async function buscarAvaliacao(req, res) {
    try {
        const pool = await getConnection();

        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('SELECT * FROM Avaliacoes WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({
                sucesso: false,
                erro: 'Avaliação não encontrada'
            });
        }

        res.status(200).json({
            sucesso: true,
            dados: result.recordset[0]
        });

    } catch (err) {
        res.status(500).json({
            sucesso: false,
            erro: err.message
        });
    }
}

// Calcular IMC da avaliação
async function calcularIMCAvaliacao(req, res) {
    try {
        const pool = await getConnection();

        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query(`
                SELECT id, peso, altura
                FROM Avaliacoes
                WHERE id = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                sucesso: false,
                erro: 'Avaliação não encontrada'
            });
        }

        const avaliacao = result.recordset[0];

        const resultadoIMC = calcularIMC(
            avaliacao.peso,
            avaliacao.altura
        );

        res.status(200).json({
            sucesso: true,
            dados: {
                avaliacao_id: avaliacao.id,
                imc: resultadoIMC.imc,
                classificacao: resultadoIMC.classificacao
            }
        });

    } catch (err) {
        res.status(500).json({
            sucesso: false,
            erro: err.message
        });
    }
}

// EXPORTAÇÃO CORRETA (tudo junto)
module.exports = {
    criarAvaliacao,
    listarAvaliacoes,
    buscarAvaliacao,
    calcularIMCAvaliacao
};