// src/routes/pedido.routes.ts
import { Router } from 'express'
import PedidoController from '../controllers/pedido.controller'

const router = Router()

const pedidoController = new PedidoController()

// Rotas para pedidos
router.post('/pedidos', pedidoController.create)
router.get('/pedidos', pedidoController.getAll)
router.get('/pedidos/:id', pedidoController.getById)
router.put('/pedidos/:id', pedidoController.update)
router.delete('/pedidos/:id', pedidoController.remove)
router.put('/pedidos/:id/status', pedidoController.changeStatus)

export default router
