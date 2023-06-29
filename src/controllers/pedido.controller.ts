// src/controllers/pedido.controller.ts
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class PedidoController {
  async create(req: Request, res: Response) {
    try {
      const { clienteId, produtos } = req.body

      const pedido = await prisma.pedido.create({
        data: {
          clienteId,
          produtos: {
            createMany: {
              data: produtos.map((produto: any) => ({
                produtoId: produto.produtoId,
                quantidade: produto.quantidade,
              })),
            },
          },
          status: 'Recebido',
        },
        include: {
          produtos: true,
        },
      })

      res.status(201).json(pedido)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao criar pedido.' })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const pedidos = await prisma.pedido.findMany({
        include: {
          produtos: true,
        },
      })
      res.json(pedidos)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao obter pedidos.' })
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params

      const pedido = await prisma.pedido.findUnique({
        where: { id: Number(id) },
        include: {
          produtos: true,
        },
      })

      if (!pedido) {
        return res.status(404).json({ message: 'Pedido não encontrado.' })
      }

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

      const pedido = await prisma.pedido.update({
        where: { id: Number(id) },
        data: {
          produtos: {
            deleteMany: {},
            createMany: {
              data: produtos.map((produto: any) => ({
                produtoId: produto.produtoId,
                quantidade: produto.quantidade,
              })),
            },
          },
        },
        include: {
          produtos: true,
        },
      })

      res.json(pedido)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao atualizar pedido.' })
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params

      await prisma.pedido.delete({
        where: { id: Number(id) },
      })

      res.sendStatus(204)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao remover pedido.' })
    }
  }
  async changeStatus(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { status } = req.body

      const pedido = await prisma.pedido.update({
        where: { id: Number(id) },
        data: { status },
      })

      res.json(pedido)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao alterar status do pedido.' })
    }
  }
}

export default PedidoController
