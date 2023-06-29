// src/routes/produto.routes.ts
import { Router } from 'express'
import ProdutoController from '../controllers/produto.controller'

const router = Router()

const produtoController = new ProdutoController()

// Rotas para produtos
router.post('/produtos', produtoController.create)
router.get('/produtos', produtoController.getAll)
router.get('/produtos/:id', produtoController.getById)
router.put('/produtos/:id', produtoController.update)
router.delete('/produtos/:id', produtoController.remove)

export default router
