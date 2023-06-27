import { PrismaClient } from '@prisma/client';
import { Funcionario } from '../entities/funcionario';

class FuncionarioRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async criarFuncionario(funcionarioData: Partial<Funcionario>): Promise<Funcionario> {
        return this.prisma.funcionario.create({ data: funcionarioData });
    }

    async atualizarFuncionario(id: string, funcionarioData: Partial<Funcionario>): Promise<Funcionario> {
        return this.prisma.funcionario.update({ where: { id }, data: funcionarioData });
    }

    async obterFuncionarioPorId(id: string): Promise<Funcionario | null> {
        return this.prisma.funcionario.findUnique({ where: { id } });
    }

    async obterFuncionarioPorEmail(email: string): Promise<Funcionario | null> {
        return this.prisma.funcionario.findUnique({ where: { email } });
    }

    async obterFuncionarios(): Promise<Funcionario[]> {
        return this.prisma.funcionario.findMany();
    }

    async removerFuncionario(id: string): Promise<Funcionario> {
        return this.prisma.funcionario.delete({ where: { id } });
    }
}

export default FuncionarioRepository;
