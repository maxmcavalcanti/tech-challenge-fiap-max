// src/controllers/cliente.controller.ts
import { Request, Response } from 'express'
import { ClienteController } from '../../interfaces/controllers/cliente.controller.interface'
import { CriarClienteUseCase } from '../../application/usecases/cliente/criarClienteUseCase'
import { ObterClientesUseCase } from '../../application/usecases/cliente/obterClientesUseCase'
import { ObterClientePorIdUseCase } from '../../application/usecases/cliente/obterClientePorIdUseCase'
import { RemoverClienteUseCase } from '../../application/usecases/cliente/removerClienteUseCase'
import { ObterClientePorCPFUseCase } from '../../application/usecases/cliente/obterClientePorCPFUseCase'
import { EditarClienteUseCase } from '../../application/usecases/cliente/editarClienteUseCase'
import { randomUUID } from 'crypto'

export class ClienteControllerImpl implements ClienteController {
  constructor(
    private criarClienteUseCase: CriarClienteUseCase,
    private obterClientesUseCase: ObterClientesUseCase,
    private obterClientePorIdUseCase: ObterClientePorIdUseCase,
    private removerClienteUseCase: RemoverClienteUseCase,
    private editarClienteUseCase: EditarClienteUseCase,
    private obterClientePorCPFUseCase: ObterClientePorCPFUseCase
  ) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getByCPF = this.getByCPF.bind(this);
    this.getById = this.getById.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
  }

  async create(req: Request, res: Response) {
    try {
      const { nome, email, cpf, endereco, } = req.body
      const id = randomUUID()
      const cliente = await this.criarClienteUseCase.execute({ id, cpf, email, endereco, nome })
      res.status(201).json(cliente)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao criar cliente.' })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const clientes = await this.obterClientesUseCase.execute()
      res.json(clientes)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao obter clientes.' })
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const cliente = await this.obterClientePorIdUseCase.execute(id)
      res.json(cliente)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao obter cliente.' })
    }
  }

  async getByCPF(req: Request, res: Response) {
    try {
      const { CPF } = req.params
      const cliente = await this.obterClientePorCPFUseCase.execute(CPF)
      res.json(cliente)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao obter cliente.' })
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { nome, email, cpf, endereco } = req.body
      const cliente = await this.editarClienteUseCase.execute(id, { id, nome, email, cpf, endereco })
      res.json(cliente)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao atualizar cliente.' })
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params
      await this.removerClienteUseCase.execute(id)
      res.sendStatus(204)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao remover cliente.' })
    }
  }
}

