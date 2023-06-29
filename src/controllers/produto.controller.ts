// src/controllers/produto.controller.ts
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class ProdutoController {
  async create(req: Request, res: Response) {
    try {
      const { nome, categoria, preco, descricao } = req.body

      const produto = await prisma.produto.create({
        data: {
          nome,
          categoria,
          preco,
          descricao,
        },
      })

      res.status(201).json(produto)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao criar produto.' })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const produtos = await prisma.produto.findMany()
      res.json(produtos)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao obter produtos.' })
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params

      const produto = await prisma.produto.findUnique({
        where: { id: Number(id) },
      })

      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado.' })
      }

      res.json(produto)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao obter produto.' })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { nome, categoria, preco, descricao } = req.body

      const produto = await prisma.produto.update({
        where: { id: Number(id) },
        data: {
          nome,
          categoria,
          preco,
          descricao,
        },
      })

      res.json(produto)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao atualizar produto.' })
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params

      await prisma.produto.delete({
        where: { id: Number(id) },
      })

      res.sendStatus(204)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao remover produto.' })
    }
  }
}

export default ProdutoController
