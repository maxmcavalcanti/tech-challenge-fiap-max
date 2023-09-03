import express from 'express';
import { ClienteController } from '../controllers/cliente.controller.interface';

const clienteRouter = express.Router();

export const initClienteRoutes = (app: express.Express, controller: ClienteController) => {
    clienteRouter.post('/clientes', controller.create);
    clienteRouter.get('/clientes', controller.getAll);
    clienteRouter.get('/clientes/:id', controller.getById);
    clienteRouter.get('/clientes/cpf/:CPF', controller.getByCPF);
    clienteRouter.put('/clientes/:id', controller.update);
    clienteRouter.delete('/clientes/:id', controller.remove);

    app.use('/', clienteRouter);
};

export default clienteRouter;
