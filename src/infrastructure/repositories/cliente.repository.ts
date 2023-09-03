import { Cliente, PrismaClient } from '@prisma/client';
import { ClienteRepository } from '../../interfaces/repositories/cliente.repository.interface';

export class ClienteRepositoryImpl implements ClienteRepository {
    private prisma: PrismaClient;
    constructor() { this.prisma = new PrismaClient(); }

    async criarCliente(clienteData: Cliente): Promise<Cliente> {
        return await this.prisma.cliente.create({ data: clienteData });
    }

    async obterClientePorId(id: string): Promise<Cliente | null> {
        return await this.prisma.cliente.findUnique({ where: { id } });
    }

    async obterClientes(): Promise<Cliente[]> {
        return await this.prisma.cliente.findMany();
    }

    async removerCliente(id: string): Promise<void> {
        await this.prisma.cliente.delete({ where: { id } });
    }

    async editarCliente(id: string, clienteData: Partial<Cliente>): Promise<Cliente> {
        return await this.prisma.cliente.update({ where: { id }, data: clienteData });
    }

    async obterClientePorCPF(CPF: string): Promise<Cliente | null> {
        return await this.prisma.cliente.findUnique({ where: { cpf: CPF } });
    }
}

