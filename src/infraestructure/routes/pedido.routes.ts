import { Router } from 'express';
import PedidoController from '../controllers/pedido.controller';

const router = Router();
const pedidoController = new PedidoController();

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: API de gerenciamento de pedidos
 */

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Cria um novo pedido.
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PedidoInput'
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso.
 *       400:
 *         description: Erro ao criar o pedido.
 */
router.post('/pedidos', pedidoController.create);

/**
 * @swagger
 * /pedidos-ativos:
 *   get:
 *     summary: Retorna todos os pedidos ativos.
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos ativos retornada com sucesso.
 *       500:
 *         description: Erro ao obter a lista de pedidos ativos.
 */
router.get('/pedidos-ativos', pedidoController.getAll);

/**
 * @swagger
 * /pedidos-cancelados:
 *   get:
 *     summary: Retorna todos os pedidos cancelados.
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos cancelados retornada com sucesso.
 *       500:
 *         description: Erro ao obter a lista de pedidos cancelados.
 */
router.get('/pedidos-cancelados', pedidoController.getAllCancelled);

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Retorna um pedido pelo ID.
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do pedido.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido retornado com sucesso.
 *       404:
 *         description: Pedido não encontrado.
 */
router.get('/pedidos/:id', pedidoController.getById);

/**
 * @swagger
 * /pedidos/{id}:
 *   put:
 *     summary: Atualiza um pedido.
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do pedido.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PedidoInput'
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso.
 *       400:
 *         description: Erro ao atualizar o pedido.
 *       404:
 *         description: Pedido não encontrado.
 */
router.put('/pedidos/:id', pedidoController.update);

/**
 * @swagger
 * /pedidos/{id}:
 *   delete:
 *     summary: Remove um pedido.
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do pedido.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *        204:
 *          description: Pedido removido com sucesso.
 *        404:
 *          description: Pedido não encontrado.
 */
router.delete('/pedidos/:id', pedidoController.remove);

/**
 * @swagger
 * /pedidos/{id}/status:
 *   put:
 *     summary: Altera o status de um pedido.
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do pedido.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PedidoStatusInput'
 *     responses:
 *       200:
 *         description: Status do pedido atualizado com sucesso.
 *       400:
 *         description: Erro ao atualizar o status do pedido.
 *       404:
 *         description: Pedido não encontrado.
 */
router.put('/pedidos/:id/status', pedidoController.changeStatus);

export default router;
