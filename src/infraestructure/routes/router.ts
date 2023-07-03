import { Router } from 'express';
import clienteRoutes from './cliente.routes';
import funcionarioRoutes from './funcionario.routes';
import pedidoRoutes from './pedido.routes';
import produtoRoutes from './produto.routes';


const router = Router();

// Registrar as rotas
router.use(clienteRoutes);
router.use(funcionarioRoutes);
router.use(produtoRoutes);
router.use(pedidoRoutes);

export default router;
