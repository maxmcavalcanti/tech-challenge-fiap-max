import { Pedido, PrismaClient } from '@prisma/client';

class PedidoRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async criarPedido(pedidoData: Pedido): Promise<Pedido> {
        return this.prisma.pedido.create({ data: pedidoData });
    }

    async atualizarPedido(id: string, pedidoData: Partial<Pedido>): Promise<Pedido> {
        return this.prisma.pedido.update({ where: { id }, data: pedidoData });
    }

    async obterPedidoPorId(id: string): Promise<Pedido | null> {
        return this.prisma.pedido.findUnique({ where: { id } });
    }

    async obterPedidos(): Promise<Pedido[]> {
        return this.prisma.pedido.findMany();
    }

    async removerPedido(id: string): Promise<Pedido> {
        return this.prisma.pedido.delete({ where: { id } });
    }
}

export default PedidoRepository;
