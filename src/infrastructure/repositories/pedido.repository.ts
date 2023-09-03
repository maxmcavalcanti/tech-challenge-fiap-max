import { ItemPedido, PrismaClient } from '@prisma/client';
import { PedidoFinal, PedidoRepository } from '../../interfaces/repositories/pedido.repository.interface';

export class PedidoRepositoryImpl implements PedidoRepository {
    private prisma: PrismaClient;
    constructor() { this.prisma = new PrismaClient(); }

    async criarPedido(clienteId: string, produtos: ItemPedido[], metodoPagamento: string, totalValue: number): Promise<any> {
        const pedidoSalvo = await this.prisma.pedido.create({
            data: {
                clienteId: clienteId,
                metodoPagamento: metodoPagamento,
                status: '0 - Aguardando Pagamento',
                statusPagamento: 'Aguardando Pagamento',
                totalValue: totalValue,
                produtos: {
                    createMany: {
                        data: produtos.map((produto) => ({
                            produtoId: produto.produtoId,
                            quantidade: produto.quantidade,
                            precoUnitario: produto.precoUnitario,
                        })),
                    },
                },
            },
            include: { produtos: true, },
        });

        const produtosComNomes = await Promise.all(
            pedidoSalvo.produtos.map(async (item) => {
                const nomeProduto = await this.prisma.produto.findUnique({
                    where: { id: item.produtoId, },
                    select: { nome: true, },
                });
                return { ...item, nome: nomeProduto?.nome || '', };
            })
        );
        return { ...pedidoSalvo, produtos: produtosComNomes, };
    }

    async atualizarPedido(id: string, produtos: ItemPedido[]): Promise<any> {
        const pedido = await this.prisma.pedido.update({
            where: { id },
            data: {
                produtos: {
                    deleteMany: {},
                    createMany: {
                        data: produtos.map((produto: any) => ({
                            produtoId: produto.produtoId,
                            quantidade: produto.quantidade,
                            precoUnitario: produto.precoUnitario
                        })),
                    },
                },
            },
            include: { produtos: true, },
        })
        return pedido
    }

    async obterPedidoPorId(id: string): Promise<any> {
        return this.prisma.pedido.findUnique({ where: { id }, include: { produtos: true, }, })
    }

    async obterPedidos(): Promise<PedidoFinal[]> {
        const pedidos = await this.prisma.pedido.findMany({
            where: { NOT: { status: { in: ['Cancelado', 'Finalizado', 'Não autorizado'], }, }, },
            orderBy: [{ status: 'desc' }, { createdAt: 'asc' },],
            include: { produtos: { select: { quantidade: true, produtoId: true } } },
        });
        const pedidosWithProductNames = await Promise.all(
            pedidos.map(async (pedido) => {
                const produtosWithNames = await Promise.all(
                    pedido.produtos.map(async (item) => {
                        const produto = await this.prisma.produto.findUnique({
                            where: { id: item.produtoId, },
                            select: { nome: true },
                        });
                        return {
                            quantidade: item.quantidade,
                            nome: produto?.nome || 'Produto não encontrado',
                        };
                    })
                );
                return { ...pedido, produtos: produtosWithNames, };
            })
        );
        return pedidosWithProductNames
    }

    async removerPedido(id: string): Promise<any> {
        try {
            const itensPedido = await this.prisma.itemPedido.findMany({ where: { pedidoId: id, }, });
            for (const item of itensPedido) { await this.prisma.itemPedido.delete({ where: { id: item.id, }, }); }
            await this.prisma.pedido.delete({ where: { id, }, });
            return { success: true };
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao remover pedido.');
        }
    }

    async mudarStatus(id: string, status: string): Promise<any> {
        return this.prisma.pedido.update({ where: { id }, data: { status }, })
    }

    async mudarStatusPagamento(id: string, statusPagamento: string): Promise<any> {
        if (statusPagamento === 'Pagamento Aprovado') {
            return await this.prisma.pedido.update({ where: { id }, data: { statusPagamento, status: '1 - Recebido' } })
        } else {
            return await this.prisma.pedido.update({ where: { id }, data: { statusPagamento, status: 'Não autorizado' } })
        }
    }

    async obterStatusPagamento(id: string): Promise<{ numeroPedido: number; statusPagamento: string; } | null> {
        const pedido = await this.prisma.pedido.findUnique({ where: { id }, });
        if (pedido) {
            return ({ numeroPedido: pedido.numeroPedido, statusPagamento: pedido.statusPagamento });
        } else {
            return null
        }

    }
}
