import { Router } from 'express';
import ProdutoController from '../controllers/produto.controller';

const router = Router();
const produtoController = new ProdutoController();

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: API de gerenciamento de produtos
 */

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto.
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProdutoInput'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso.
 *       400:
 *         description: Erro ao criar o produto.
 */
router.post('/produtos', produtoController.create);

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Retorna todos os produtos.
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso.
 *       500:
 *         description: Erro ao obter a lista de produtos.
 */
router.get('/produtos', produtoController.getAll);

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID.
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do produto.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto retornado com sucesso.
 *       404:
 *         description: Produto não encontrado.
 */
router.get('/produtos/:id', produtoController.getById);

/**
 * @swagger
 * /produtos/categoria/{category}:
 *   get:
 *     summary: Retorna todos os produtos de uma determinada categoria.
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: category
 *         description: Categoria do produto.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de produtos da categoria retornada com sucesso.
 *       500:
 *         description: Erro ao obter a lista de produtos da categoria.
 */
router.get('/produtos/categoria/:category', produtoController.getByCategory);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto.
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do produto.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProdutoInput'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso.
 *       400:
 *         description: Erro ao atualizar o produto.
 *       404:
 *         description: Produto não encontrado.
 */
router.put('/produtos/:id', produtoController.update);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Remove um produto.
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do produto.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Produto removido com sucesso.
 *       404:
 *         description: Produto não encontrado.
 */
router.delete('/produtos/:id', produtoController.remove);

export default router;
