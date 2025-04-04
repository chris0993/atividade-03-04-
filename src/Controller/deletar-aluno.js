const User = require('../models/aluno-model');
class DeletarAlunosController {
    async handle(req, res) {
        const { id } = req.params;
        try {
            const aluno = await Aluno.findByPk(id);

            if (!aluno) {
                return {
                    statusCode: 404,
                    body: { error: 'Aluno não encontrado' },
                };
            }
            await aluno.destroy();
            return {
                statusCode: 204,
                body: {},
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: { error: error.message },
            };
        }  
    }
}

module.exports = DeletarAlunosController;