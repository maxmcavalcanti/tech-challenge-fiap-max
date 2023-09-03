import express from 'express';
import { ProdutoController } from '../controllers/produto.controller.interface';

const produtoRouter = express.Router();

export const initProdutoRoutes = (app: express.Express, controller: ProdutoController) => {
    // Rotas CRUD padrão para produtos
    produtoRouter.post('/', controller.create);
    produtoRouter.get('/', controller.getAll);
    produtoRouter.get('/:id', controller.getById);
    produtoRouter.put('/:id', controller.update);
    produtoRouter.delete('/:id', controller.remove);

    // Rota específica para obter produtos por categoria
    produtoRouter.get('/categoria/:categoria', controller.getByCategory);

    app.use('/produtos', produtoRouter);
};

export default produtoRouter;
