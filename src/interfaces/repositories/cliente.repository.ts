import { Cliente, PrismaClient } from '@prisma/client';

class ClienteRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async criarCliente(clienteData: Cliente): Promise<Cliente> {
        return this.prisma.cliente.create({ data: clienteData });
    }

    async atualizarCliente(id: string, clienteData: Partial<Cliente>): Promise<Cliente> {
        return this.prisma.cliente.update({ where: { id }, data: clienteData });
    }

    async obterClientePorId(id: string): Promise<Cliente | null> {
        return this.prisma.cliente.findUnique({ where: { id } });
    }

    async obterClientes(): Promise<Cliente[]> {
        return this.prisma.cliente.findMany();
    }

    async removerCliente(id: string): Promise<Cliente> {
        return this.prisma.cliente.delete({ where: { id } });
    }
}

export default ClienteRepository;
