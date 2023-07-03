// src/controllers/pedido.controller.ts
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class PedidoController {
  async create(req: Request, res: Response) {
    try {
      const { cpf, produtos, metodoPagamento } = req.body;

      const cliente = await prisma.cliente.findFirst({ where: { cpf } });
      console.log(cliente)
      if (!cliente) {
        return res.status(400).json({ message: 'Cliente inválido. Não foi possível criar o pedido!' });
      }

      const pedido = await prisma.pedido.create({
        data: {
          clienteId: cliente.id,
          metodoPagamento,
          status: 'Recebido',
          totalValue: 0
        },
        include: {
          produtos: true,
        }
      });
      console.log(pedido)


      const createdProdutos = [];

      for (const produto of produtos) {
        const createdProduto = await prisma.itemPedido.create({
          data: {
            produtoId: produto.produtoId,
            quantidade: produto.quantidade,
            precoUnitario: produto.precoUnitario,
            pedidoId: pedido.id,

          },
        });

        createdProdutos.push(createdProduto);
      }

      console.log(createdProdutos)
      const totalValue = createdProdutos.reduce((accumulator, currentValue) =>
        accumulator + (currentValue.precoUnitario * currentValue.quantidade), 0)
      pedido.produtos = createdProdutos;
      pedido.totalValue = totalValue

      res.status(201).json(pedido);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create pedido.' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const pedidos = await prisma.pedido.findMany({
        where: {
          NOT: {
            status: 'Cancelado',
          },
        },
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
  async getAllCancelled(req: Request, res: Response) {
    try {
      const pedidos = await prisma.pedido.findMany({
        where: {
          status: 'Cancelado',
        },
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
        where: { id },
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
        where: { id },
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
      const { status } = req.body

      const pedido = await prisma.pedido.update({
        where: { id },
        data: { status: 'Cancelado' },
      })

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

      const pedido = await prisma.pedido.update({
        where: { id },
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
