import express from 'express';
import { PedidoController } from '../controllers/pedido.controller.interface';

const pedidoRouter = express.Router();

export const initPedidoRoutes = (app: express.Express, controller: PedidoController) => {
    // Rotas CRUD padrão para pedidos
    pedidoRouter.post('/', controller.create);
    pedidoRouter.get('/', controller.getAll);
    pedidoRouter.get('/:id', controller.getById);
    pedidoRouter.put('/:id', controller.update);
    pedidoRouter.delete('/:id', controller.remove);

    // Rota específica para atualizar o status do pedido
    pedidoRouter.put('/:id/status', controller.changeStatus);

    // Rota específica para atualizar o status de pagamento do pedido
    pedidoRouter.put('/:id/status-pagamento', controller.changePaymentStatus);

    // Rota específica para obter o status de pagamento de um pedido
    pedidoRouter.get('/:id/status-pagamento', controller.getPaymentStatus);

    // Rota para receber webhooks de atualização de status de pagamento
    pedidoRouter.post('/webhook/pagamento', controller.changePaymentStatus);

    app.use('/pedidos', pedidoRouter);
};

export default pedidoRouter;
