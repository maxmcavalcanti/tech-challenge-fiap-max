import express from 'express';
import clienteRoutes from './infraestructure/routes/cliente.routes';
import funcionarioRoutes from './infraestructure/routes/funcionario.routes';
import pedidoRoutes from './infraestructure/routes/pedido.routes';
import produtoRoutes from './infraestructure/routes/produto.routes';
import swaggerConfig from './../swaggerConfig';
import router from './infraestructure/routes/router';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
// Registrar as rotas
app.use(clienteRoutes);
app.use(funcionarioRoutes);
app.use(produtoRoutes);
app.use(pedidoRoutes);
// Configuração das rotas
app.get('/', (req, res) => {
  res.send('Bem-vindo à API da Lanchonete!');
});

// Exportar a função para criação do servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
})

// Configuração do Swagger
swaggerConfig(app, router);
export default app