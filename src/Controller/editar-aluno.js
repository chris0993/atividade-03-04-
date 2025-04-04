const Alunos = require('../models/aluno-model');
class EditarAlunosController {
    async handle(req, res) {
        const { id } = req.params;
        const { nome, email, senha } = req.body;
        try {
            const aluno = await Aluno.findByPk(id);
            if (!aluno) {
                return {
                    statusCode: 404,
                    body: { error: 'Aluno não encontrado' }
                }
            }
            await aluno.update({
                nome,
                email,
                senha,
            });
            return {
                statusCode: 200,
                body: aluno,
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: { error: error.message }
            }
        }
    }
}

module.exports = EditarAlunosController;