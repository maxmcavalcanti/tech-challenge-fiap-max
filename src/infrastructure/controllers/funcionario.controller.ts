// src/controllers/funcionario.controller.ts
import { Request, Response } from 'express'
import CriarFuncionarioUseCase from '../../application/usecases/funcionario/criarFuncionarioUseCase'
import { ObterFuncionarioPorIdUseCase } from '../../application/usecases/funcionario/obterFuncionarioPorIdUseCase'
import { ObterFuncionariosUseCase } from '../../application/usecases/funcionario/obterFuncionariosUseCase'
import RemoverFuncionarioUseCase from '../../application/usecases/funcionario/removerFuncionarioUseCase'
import AtualizarFuncionarioUseCase from '../../application/usecases/funcionario/atualizarFuncionarioUseCase'
import { FuncionarioController } from '../../interfaces/controllers/funcionario.controller.interface'
import { randomUUID } from 'crypto'

export class FuncionarioControllerImpl implements FuncionarioController {

  constructor(
    private criarFuncionarioUseCase: CriarFuncionarioUseCase,
    private obterFuncionariosUseCase: ObterFuncionariosUseCase,
    private obterFuncionarioPorIdUseCase: ObterFuncionarioPorIdUseCase,
    private removerFuncionarioUseCase: RemoverFuncionarioUseCase,
    private atualizarFuncionarioUseCase: AtualizarFuncionarioUseCase
  ) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);

  }
  async create(req: Request, res: Response) {
    try {
      const { nome, email, senha } = req.body
      const id = randomUUID()
      const funcionario = await this.criarFuncionarioUseCase.execute({ id, nome, email, senha })
      res.status(201).json(funcionario)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao criar funcionário.' })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const funcionarios = await this.obterFuncionariosUseCase.execute()
      res.json(funcionarios)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao obter funcionários.' })
    }
  }
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const funcionario = await this.obterFuncionarioPorIdUseCase.execute(id)
      res.json(funcionario)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao obter funcionário.' })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { nome, email, senha } = req.body
      const funcionario = await this.atualizarFuncionarioUseCase.execute(id, { nome, email, senha })
      res.json(funcionario)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao atualizar funcionário.' })
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params
      await this.removerFuncionarioUseCase.execute(id)
      res.sendStatus(204)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao remover funcionário.' })
    }
  }
}

