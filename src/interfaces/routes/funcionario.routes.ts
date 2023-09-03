import express from 'express';
import { FuncionarioController } from '../controllers/funcionario.controller.interface';

const funcionarioRouter = express.Router();

export const initFuncionarioRoutes = (app: express.Express, controller: FuncionarioController) => {
    funcionarioRouter.post('/funcionarios', controller.create);
    funcionarioRouter.get('/funcionarios', controller.getAll);
    funcionarioRouter.get('/funcionarios/:id', controller.getById);
    funcionarioRouter.put('/funcionarios/:id', controller.update);
    funcionarioRouter.delete('/funcionarios/:id', controller.remove);

    app.use('/', funcionarioRouter);
};

export default funcionarioRouter;
