const Alunos = require('../models/aluno-model');

class ListarAlunosController {
  async handle(req, res) {
    try {
        const alunos = await Aluno.findAll();
        return {
            statusCode: 200,
            body: alunos,
        };
    } catch (error) {
      return {
        statusCode: 500,
        body: { error: error.message },
      };
        
    }
  }
}

module.exports = ListarAlunosController;