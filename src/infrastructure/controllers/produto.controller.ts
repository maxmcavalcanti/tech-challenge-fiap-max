// src/controllers/produto.controller.ts
import { Request, Response } from 'express'
import CriarProdutoUseCase from '../../application/usecases/produto/criarProdutoUseCase'
import BuscarProdutosUseCase from '../../application/usecases/produto/buscarProdutosUseCase'
import BuscarProdutoPorIdUseCase from '../../application/usecases/produto/buscarProdutoPorIdUseCase'
import RemoverProdutoUseCase from '../../application/usecases/produto/removerProdutoUseCase'
import EditarProdutoUseCase from '../../application/usecases/produto/editarProdutoUseCase'
import BuscarProdutoPorCategoriaUseCase from '../../application/usecases/produto/buscarProdutoPorCategoriaUseCase'
import { ProdutoController } from '../../interfaces/controllers/produto.controller.interface'
import { randomUUID } from 'crypto'

export class ProdutoControllerImpl implements ProdutoController {

  constructor(
    private criarProdutoUseCase: CriarProdutoUseCase,
    private buscarProdutosUseCase: BuscarProdutosUseCase,
    private buscarProdutoPorIdUseCase: BuscarProdutoPorIdUseCase,
    private removerProdutoUseCase: RemoverProdutoUseCase,
    private editarProdutoUseCase: EditarProdutoUseCase,
    private buscarProdutoPorCategoriaUseCase: BuscarProdutoPorCategoriaUseCase
  ) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.getByCategory = this.getByCategory.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async create(req: Request, res: Response) {
    try {
      const { nome, categoria, preco, descricao } = req.body
      const id = randomUUID()
      console.log(nome, categoria, preco)
      const produto = await this.criarProdutoUseCase.execute({ id, nome, categoria, preco, descricao })
      res.status(201).json(produto)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao criar produto.' })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const produtos = await this.buscarProdutosUseCase.execute()
      res.json(produtos)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao obter produtos.' })
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const produto = await this.buscarProdutoPorIdUseCase.execute(id)
      res.json(produto)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao obter produto.' })
    }
  }

  async getByCategory(req: Request, res: Response) {
    try {
      const { categoria } = req.params
      const produtos = await this.buscarProdutoPorCategoriaUseCase.execute(categoria)
      res.json(produtos)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao obter produtos dessa categoria.' })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { nome, categoria, preco, descricao } = req.body
      const produto = await this.editarProdutoUseCase.execute(id, { nome, categoria, preco, descricao })
      res.json(produto)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao atualizar produto.' })
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params
      await this.removerProdutoUseCase.execute(id)
      res.sendStatus(204)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao remover produto.' })
    }
  }
}

