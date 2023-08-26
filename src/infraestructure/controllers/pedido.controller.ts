// src/controllers/pedido.controller.ts
import { Request, Response } from 'express'
import { ItemPedido, PrismaClient } from '@prisma/client'
import { Pedido } from '../../domain/entities/pedido';
import { ItemPedido as ItemPedidoDomain } from '../../domain/entities/itemPedido';

const prisma = new PrismaClient()

class PedidoController {
  async create(req: Request, res: Response) {
    try {
      const { cpf, produtos, metodoPagamento } = req.body;

      // 1. Encontre o cliente com base no CPF fornecido.
      const cliente = await prisma.cliente.findFirst({ where: { cpf } });

      if (!cliente) {
        return res.status(400).json({ message: 'Cliente inválido. Não foi possível criar o pedido!' });
      }

      // 2. Calcule o valor total com base nos itens do pedido.
      const totalValue = produtos.reduce((accumulator: any, produto: any) =>
        accumulator + (produto.quantidade * produto.precoUnitario), 0);

      // 3. Crie um novo pedido associado ao cliente.
      const pedido = new Pedido(cliente.id, produtos.map((produto: any) => new ItemPedidoDomain(produto.produtoId, produto.quantidade, produto.precoUnitario)), 'Recebido', metodoPagamento);

      // 4. Salve o pedido no banco de dados.
      const pedidoSalvo = await prisma.pedido.create({
        data: {
          clienteId: pedido.clienteId,
          metodoPagamento: pedido.metodoPagamento,
          status: '0 - Aguardando Pagamento',
          statusPagamento: 'Aguardando Pagamento',
          totalValue: totalValue,
          produtos: {
            createMany: {
              data: pedido.produtos.map((item) => ({
                produtoId: item.produtoId,
                quantidade: item.quantidade,
                precoUnitario: item.precoUnitario,
              })),
            },
          },
        },
        include: {
          produtos: true,
        },
      });

      // 5. Consulte as informações do nome do produto com base no ProdutoId.
      const produtosComNomes = await Promise.all(
        pedidoSalvo.produtos.map(async (item) => {
          const nomeProduto = await prisma.produto.findUnique({
            where: {
              id: item.produtoId,
            },
            select: {
              nome: true, // Seleciona apenas o nome do produto.
            },
          });
          return {
            ...item,
            nome: nomeProduto?.nome || '', // Adiciona o nome do produto aos itens.
          };
        })
      );

      // 6. Retorne o pedido criado como resposta, incluindo o nome do produto.
      const pedidoComNomes = {
        ...pedidoSalvo,
        produtos: produtosComNomes,
      };

      res.status(201).json(pedidoComNomes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create pedido.' });
    }
  }

  async getPaymentStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const pedido = await prisma.pedido.findUnique({
        where: { id },
      });

      if (!pedido) {
        return res.status(404).json({ message: 'Pedido não encontrado.' });
      }

      res.json({ numeroPedido: pedido.numeroPedido, statusPagamento: pedido.statusPagamento });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao consultar o status de pagamento.' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const pedidos = await prisma.pedido.findMany({
        where: {
          NOT: {
            status: {
              in: ['Cancelado', 'Finalizado'],
            },
          },
        },
        orderBy: [
          { status: 'desc' }, // Prioridade de status
          { createdAt: 'asc' }, // Ordenação por recebimento
        ],
        include: {
          produtos: {
            select: {
              quantidade: true,
              produtoId: true
            }
          }
        },
      });
      const pedidosWithProductNames = await Promise.all(
        pedidos.map(async (pedido) => {
          const produtosWithNames = await Promise.all(
            pedido.produtos.map(async (item) => {
              const produto = await prisma.produto.findUnique({
                where: {
                  id: item.produtoId,
                },
                select: {
                  nome: true
                },
              });

              return {
                quantidade: item.quantidade,
                nome: produto?.nome || 'Produto não encontrado',
              };
            })
          );

          return {
            ...pedido,
            produtos: produtosWithNames,
          };
        })
      );

      res.json(pedidosWithProductNames);
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

  async changePaymentStatus(req: Request, res: Response) {
    try {
      const { id, statusPagamento } = req.body
      if (statusPagamento === 'Pagamento Aprovado') {
        const pedido = await prisma.pedido.update({
          where: { id },
          data: { statusPagamento, status: '1 - Recebido' }
        })
        res.json(pedido)
        return
      } else {
        const pedido = await prisma.pedido.update({
          where: { id },
          data: { statusPagamento, status: 'Não autorizado' }
        })
        res.json(pedido)
        return
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao alterar status de pegamento do pedido.' })
    }
  }
}

export default PedidoController
