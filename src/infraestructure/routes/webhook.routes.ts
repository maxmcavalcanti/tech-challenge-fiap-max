import { Router } from 'express';
import ClienteController from '../controllers/cliente.controller';
import PedidoController from '../controllers/pedido.controller';

const router = Router();

const pedidoController = new PedidoController();

router.post('/webhook/pagamento', pedidoController.changePaymentStatus);

export default router;
