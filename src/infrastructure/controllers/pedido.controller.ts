// src/controllers/pedido.controller.ts
import { Request, Response } from 'express'
import CriarPedidoUseCase from '../../application/usecases/pedido/criarPedidoUseCase';
import BuscarPedidosUseCase from '../../application/usecases/pedido/buscarPedidosUseCase';
import BuscarPedidoPorIdUseCase from '../../application/usecases/pedido/buscarPedidoPorIdUseCase';
import RemoverPedidoUseCase from '../../application/usecases/pedido/removerPedidoUseCase';
import AtualizarPedidoUseCase from '../../application/usecases/pedido/atualizarPedidoUseCase';
import MudarStatusPedidoUseCase from '../../application/usecases/pedido/mudarStatusPedidoUseCase';
import MudarStatusPagamentoUseCase from '../../application/usecases/pedido/mudarStatusPagamentoUseCase';
import ObterStatusPagamentoUseCase from '../../application/usecases/pedido/obterStatusPagamentoUseCase';
import { PedidoController } from '../../interfaces/controllers/pedido.controller.interface';

export class PedidoControllerImpl implements PedidoController {
  constructor(
    private criarPedidoUseCase: CriarPedidoUseCase,
    private buscarPedidosUseCase: BuscarPedidosUseCase,
    private buscarPedidoPorIdUseCase: BuscarPedidoPorIdUseCase,
    private removerPedidoUseCase: RemoverPedidoUseCase,
    private atualizarPedidoUseCase: AtualizarPedidoUseCase,
    private mudarStatusPedidoUseCase: MudarStatusPedidoUseCase,
    private mudarStatusPagamentoPedidoUsecase: MudarStatusPagamentoUseCase,
    private obterStatusPagamentoUseCase: ObterStatusPagamentoUseCase
  ) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.getPaymentStatus = this.getPaymentStatus.bind(this)
    this.changeStatus = this.changeStatus.bind(this)
    this.changePaymentStatus = this.changePaymentStatus.bind(this)
  }

  async create(req: Request, res: Response) {
    try {
      const { cpf, produtos, metodoPagamento } = req.body;
      const pedido = await this.criarPedidoUseCase.execute(cpf, produtos, metodoPagamento);
      res.status(201).json(pedido);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create pedido.' });
    }
  }

  async getPaymentStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const pedido = await this.obterStatusPagamentoUseCase.execute(id)
      res.status(201).json(pedido);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao consultar o status de pagamento.' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const pedidos = await this.buscarPedidosUseCase.execute()
      res.json(pedidos);
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao obter pedidos.' })
    }
  }


  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const pedido = await this.buscarPedidoPorIdUseCase.execute(id)
      res.json(pedido)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao obter pedido.' })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { produtos } = req.body
      const pedido = await this.atualizarPedidoUseCase.execute(id, produtos)
      res.json(pedido)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao atualizar pedido.' })
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params
      const pedido = await this.removerPedidoUseCase.execute(id)
      res.json(pedido)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao cancelar status do pedido.' })
    }
  }

  async changeStatus(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { status } = req.body
      const pedido = await this.mudarStatusPedidoUseCase.execute(id, status)
      res.json(pedido)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao alterar status do pedido.' })
    }
  }

  async changePaymentStatus(req: Request, res: Response) {
    try {
      const { id, statusPagamento } = req.body
      const pedido = await this.mudarStatusPagamentoPedidoUsecase.execute(id, statusPagamento)
      res.json(pedido)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao alterar status de pegamento do pedido.' })
    }
  }
}

