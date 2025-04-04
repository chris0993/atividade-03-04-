const express = require('express');
const User = require('../models/user-model');
const router = express.Router();

let alunos = [];

/**
 * @swagger
 * components:
 *   schemas:
 *     Aluno:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: id gerado automaticamente pro aluno
 *         name:
 *           type: string
 *           description: Nome do aluno
 *       example:
 *         id: 1
 *         name: Christian Ajala
 *         email: christianajala@gmail.com
 *         senha: 123abc
 */

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: gerenciadores da API
 */

/**
 * @swagger
 * /api/alunos:
 *   post:
 *     summary: criar novo aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Alunos'
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *       500:
 *         description: erro no servidor
 */
// Endpoint para criação de usuário
router.post('/alunos', async (req, res) => {
    try {
        const aluno = await Aluno.create(req.body);
        res.status(201).json(aluno);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
/**
 * @swagger
 * /api/alunos:
 *   get:
 *     summary: Retorna a lista de todos os alunos
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: Lista de alunos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Alunos'
 */
// Endpoint para listagem de usuários
router.get('/alunos', async (req, res) => {
    try {
        const alunos = await Aluno.findAll();
        res.json(alunos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
/**
 * @swagger
 * /api/alunos/{id}:
 *   put:
 *     summary: Atualizar o id do aluno
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id do aluno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Alunos'
 *     responses:
 *       200:
 *         description: Aluno atualizado
 *       404:
 *         description: Aluno não encontrado
 *       500:
 *         description: erro no servidor
 */

// Endpoint para atualização de usuário
router.put('/alunos/:id', async (req, res) => {
    try {
        const aluno = await Aluno.findByPk(req.params.id);
        if (user) {
            await aluno.update(req.body);
            res.json(aluno);
        } else {
            res.status(404).json({ error: 'Aluno não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/alunos/{id}:
 *   delete:
 *     summary: Remove o id do aluno
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id do aluno
 *     responses:
 *       200:
 *         description: Aluno foi excluido
 *       404:
 *         description: Aluno não encontrado
 */

// Endpoint para deletar usuário
router.delete('/alunos/:id', async (req, res) => {
    try {
        const aluno = await Aluno.findByPk(req.params.id);
        if (aluno) {
            await aluno.destroy();
            res.json({ message: 'Aluno deletado' });
        } else {
            res.status(404).json({ error: 'Aluno não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;