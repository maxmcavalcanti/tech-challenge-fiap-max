// src/routes/funcionario.routes.ts
import express from 'express'
import FuncionarioController from '../controllers/funcionario.controller'

const router = express.Router()
const funcionarioController = new FuncionarioController()

router.post('/funcionarios', funcionarioController.create)
router.get('/funcionarios', funcionarioController.getAll)
router.get('/funcionarios/:id', funcionarioController.getById)
router.put('/funcionarios/:id', funcionarioController.update)
router.delete('/funcionarios/:id', funcionarioController.remove)
router.post('/funcionarios/login', funcionarioController.authenticate)

export default router
