import express from 'express';
import FuncionarioController from '../controllers/funcionario.controller';

const router = express.Router();
const funcionarioController = new FuncionarioController();

/**
 * @swagger
 * tags:
 *   name: Funcionários
 *   description: API de gerenciamento de funcionários
 */

/**
 * @swagger
 * /funcionarios:
 *   post:
 *     summary: Cria um novo funcionário.
 *     tags: [Funcionários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FuncionarioInput'
 *     responses:
 *       201:
 *         description: Funcionário criado com sucesso.
 *       400:
 *         description: Erro ao criar o funcionário.
 */
router.post('/funcionarios', funcionarioController.create);

/**
 * @swagger
 * /funcionarios:
 *   get:
 *     summary: Retorna todos os funcionários.
 *     tags: [Funcionários]
 *     responses:
 *       200:
 *         description: Lista de funcionários retornada com sucesso.
 *       500:
 *         description: Erro ao obter a lista de funcionários.
 */
router.get('/funcionarios', funcionarioController.getAll);

/**
 * @swagger
 * /funcionarios/{id}:
 *   get:
 *     summary: Retorna um funcionário pelo ID.
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do funcionário.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Funcionário retornado com sucesso.
 *       404:
 *         description: Funcionário não encontrado.
 */
router.get('/funcionarios/:id', funcionarioController.getById);

/**
 * @swagger
 * /funcionarios/{id}:
 *   put:
 *     summary: Atualiza um funcionário.
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do funcionário.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FuncionarioInput'
 *     responses:
 *       200:
 *         description: Funcionário atualizado com sucesso.
 *       400:
 *         description: Erro ao atualizar o funcionário.
 *       404:
 *         description: Funcionário não encontrado.
 */
router.put('/funcionarios/:id', funcionarioController.update);

/**
 * @swagger
 * /funcionarios/{id}:
 *   delete:
 *     summary: Remove um funcionário.
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do funcionário.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Funcionário removido com sucesso.
 *       404:
 *         description: Funcionário não encontrado.
 */
router.delete('/funcionarios/:id', funcionarioController.remove);

/**
 * @swagger
 * /funcionarios/login:
 *   post:
 *     summary: Autentica um funcionário.
 *     tags: [Funcionários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Credentials'
 *     responses:
 *       200:
 *         description: Funcionário autenticado com sucesso.
 *       401:
 *         description: Credenciais inválidas.
 */
router.post('/funcionarios/login', funcionarioController.authenticate);

export default router;
