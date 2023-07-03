import { Router } from 'express';
import ClienteController from '../controllers/cliente.controller';

const router = Router();

const clienteController = new ClienteController();

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: API de gerenciamento de clientes
 */

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente.
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClienteInput'
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso.
 *       400:
 *         description: Erro ao criar o cliente.
 */
router.post('/clientes', clienteController.create);

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Retorna todos os clientes.
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso.
 *       500:
 *         description: Erro ao obter a lista de clientes.
 */
router.get('/clientes', clienteController.getAll);

/**
 * @swagger
 * /clientes/id/{id}:
 *   get:
 *     summary: Retorna um cliente pelo ID.
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do cliente.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente retornado com sucesso.
 *       404:
 *         description: Cliente não encontrado.
 */
router.get('/clientes/id/:id', clienteController.getById);

/**
 * @swagger
 * /clientes/cpf/{cpf}:
 *   get:
 *     summary: Retorna um cliente pelo CPF.
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         description: CPF do cliente.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente retornado com sucesso.
 *       404:
 *         description: Cliente não encontrado.
 */
router.get('/clientes/cpf/:cpf', clienteController.getByCPF);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza um cliente.
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do cliente.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClienteInput'
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso.
 *       400:
 *         description: Erro ao atualizar o cliente.
 *       404:
 *         description: Cliente não encontrado.
 */
router.put('/clientes/:id', clienteController.update);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Remove um cliente.
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do cliente.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente removido com sucesso.
 *       404:
 *         description: Cliente não encontrado.
 */
router.delete('/clientes/:id', clienteController.remove);

export default router;
