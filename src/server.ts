import express from 'express';
import { ClienteRepositoryImpl } from './infrastructure/repositories/cliente.repository';
import { ProdutoRepositoryImpl } from './infrastructure/repositories/produto.repository';
import { PedidoRepositoryImpl } from './infrastructure/repositories/pedido.repository';
import { FuncionarioRepositoryImpl } from './infrastructure/repositories/funcionario.repository';
import { CriarClienteUseCase } from './application/usecases/cliente/criarClienteUseCase';
import { ObterClientesUseCase } from './application/usecases/cliente/obterClientesUseCase';
import { ObterClientePorIdUseCase } from './application/usecases/cliente/obterClientePorIdUseCase';
import { RemoverClienteUseCase } from './application/usecases/cliente/removerClienteUseCase';
import { EditarClienteUseCase } from './application/usecases/cliente/editarClienteUseCase';
import { ObterClientePorCPFUseCase } from './application/usecases/cliente/obterClientePorCPFUseCase';
import CriarProdutoUseCase from './application/usecases/produto/criarProdutoUseCase';
import BuscarProdutosUseCase from './application/usecases/produto/buscarProdutosUseCase';
import BuscarProdutoPorIdUseCase from './application/usecases/produto/buscarProdutoPorIdUseCase';
import RemoverProdutoUseCase from './application/usecases/produto/removerProdutoUseCase';
import EditarProdutoUseCase from './application/usecases/produto/editarProdutoUseCase';
import CriarPedidoUseCase from './application/usecases/pedido/criarPedidoUseCase';
import BuscarPedidosUseCase from './application/usecases/pedido/buscarPedidosUseCase';
import BuscarPedidoPorIdUseCase from './application/usecases/pedido/buscarPedidoPorIdUseCase';
import RemoverPedidoUseCase from './application/usecases/pedido/removerPedidoUseCase';
import AtualizarPedidoUseCase from './application/usecases/pedido/atualizarPedidoUseCase';
import MudarStatusPedidoUseCase from './application/usecases/pedido/mudarStatusPedidoUseCase';
import MudarStatusPagamentoUseCase from './application/usecases/pedido/mudarStatusPagamentoUseCase';
import ObterStatusPagamentoUseCase from './application/usecases/pedido/obterStatusPagamentoUseCase';
import CriarFuncionarioUseCase from './application/usecases/funcionario/criarFuncionarioUseCase';
import { ObterFuncionariosUseCase } from './application/usecases/funcionario/obterFuncionariosUseCase';
import { ObterFuncionarioPorIdUseCase } from './application/usecases/funcionario/obterFuncionarioPorIdUseCase';
import RemoverFuncionarioUseCase from './application/usecases/funcionario/removerFuncionarioUseCase';
import AtualizarFuncionarioUseCase from './application/usecases/funcionario/atualizarFuncionarioUseCase';
import BuscarProdutoPorCategoriaUseCase from './application/usecases/produto/buscarProdutoPorCategoriaUseCase';
import { ClienteControllerImpl } from './infrastructure/controllers/cliente.controller';
import { ProdutoControllerImpl } from './infrastructure/controllers/produto.controller';
import { PedidoControllerImpl } from './infrastructure/controllers/pedido.controller';
import { FuncionarioControllerImpl } from './infrastructure/controllers/funcionario.controller';
import { initClienteRoutes } from './interfaces/routes/cliente.routes';
import { initProdutoRoutes } from './interfaces/routes/produto.routes';
import { initPedidoRoutes } from './interfaces/routes/pedido.routes';
import { initFuncionarioRoutes } from './interfaces/routes/funcionario.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Instâncias dos repositórios
const clienteRepository = new ClienteRepositoryImpl();
const produtoRepository = new ProdutoRepositoryImpl();
const pedidoRepository = new PedidoRepositoryImpl();
const funcionarioRepository = new FuncionarioRepositoryImpl();

// Instâncias dos casos de uso relacionados a cada entidade
const criarClienteUseCase = new CriarClienteUseCase(clienteRepository);
const obterClientesUseCase = new ObterClientesUseCase(clienteRepository);
const obterClientePorIdUseCase = new ObterClientePorIdUseCase(clienteRepository);
const removerClienteUseCase = new RemoverClienteUseCase(clienteRepository);
const editarClienteUseCase = new EditarClienteUseCase(clienteRepository);
const obterClientePorCPFUseCase = new ObterClientePorCPFUseCase(clienteRepository);

const criarProdutoUseCase = new CriarProdutoUseCase(produtoRepository);
const buscarProdutosUseCase = new BuscarProdutosUseCase(produtoRepository);
const buscarProdutoPorIdUseCase = new BuscarProdutoPorIdUseCase(produtoRepository);
const removerProdutoUseCase = new RemoverProdutoUseCase(produtoRepository);
const editarProdutoUseCase = new EditarProdutoUseCase(produtoRepository);
const buscarProdutoPorCategoriaUseCase = new BuscarProdutoPorCategoriaUseCase(produtoRepository)

const criarPedidoUseCase = new CriarPedidoUseCase(pedidoRepository, clienteRepository, produtoRepository);
const buscarPedidosUseCase = new BuscarPedidosUseCase(pedidoRepository);
const buscarPedidoPorIdUseCase = new BuscarPedidoPorIdUseCase(pedidoRepository);
const removerPedidoUseCase = new RemoverPedidoUseCase(pedidoRepository);
const atualizarPedidoUseCase = new AtualizarPedidoUseCase(pedidoRepository);
const mudarStatusPedidoUseCase = new MudarStatusPedidoUseCase(pedidoRepository)
const mudarStatusPagamentoUseCase = new MudarStatusPagamentoUseCase(pedidoRepository)
const obterStatusPagamentoUseCase = new ObterStatusPagamentoUseCase(pedidoRepository)

const criarFuncionarioUseCase = new CriarFuncionarioUseCase(funcionarioRepository);
const obterFuncionariosUseCase = new ObterFuncionariosUseCase(funcionarioRepository);
const obterFuncionarioPorIdUseCase = new ObterFuncionarioPorIdUseCase(funcionarioRepository);
const removerFuncionarioUseCase = new RemoverFuncionarioUseCase(funcionarioRepository);
const atualizarFuncionarioUseCase = new AtualizarFuncionarioUseCase(funcionarioRepository);

// Instâncias dos controladores
const clienteController = new ClienteControllerImpl(
  criarClienteUseCase,
  obterClientesUseCase,
  obterClientePorIdUseCase,
  removerClienteUseCase,
  editarClienteUseCase,
  obterClientePorCPFUseCase
);

const produtoController = new ProdutoControllerImpl(
  criarProdutoUseCase, buscarProdutosUseCase, buscarProdutoPorIdUseCase, removerProdutoUseCase, editarProdutoUseCase, buscarProdutoPorCategoriaUseCase
);

const pedidoController = new PedidoControllerImpl(
  criarPedidoUseCase, buscarPedidosUseCase, buscarPedidoPorIdUseCase, removerPedidoUseCase, atualizarPedidoUseCase, mudarStatusPedidoUseCase, mudarStatusPagamentoUseCase, obterStatusPagamentoUseCase
);

const funcionarioController = new FuncionarioControllerImpl(
  criarFuncionarioUseCase,
  obterFuncionariosUseCase,
  obterFuncionarioPorIdUseCase,
  removerFuncionarioUseCase,
  atualizarFuncionarioUseCase
);



// Inicialização das rotas
initClienteRoutes(app, clienteController);
initProdutoRoutes(app, produtoController);
initPedidoRoutes(app, pedidoController);
initFuncionarioRoutes(app, funcionarioController);

// Exportar a função para criação do servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
