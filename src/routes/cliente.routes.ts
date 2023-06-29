// src/routes/cliente.routes.ts
import { Router } from 'express';
import ClienteController from '../controllers/cliente.controller';

const router = Router();

const clienteController = new ClienteController();

// Rotas para clientes
router.post('/clientes', clienteController.create);
router.get('/clientes', clienteController.getAll);
router.get('/clientes/:id', clienteController.getById);
router.put('/clientes/:id', clienteController.update);
router.delete('/clientes/:id', clienteController.remove);

export default router;
