import { Funcionario, PrismaClient } from '@prisma/client';
import { FuncionarioRepository } from '../../interfaces/repositories/funcionario.repository.interface';


export class FuncionarioRepositoryImpl implements FuncionarioRepository {
    private prisma: PrismaClient;
    constructor() { this.prisma = new PrismaClient(); }

    async criarFuncionario(funcionarioData: Funcionario): Promise<Partial<Funcionario>> {
        const funcionario = await this.prisma.funcionario.create({ data: funcionarioData });
        const funcionarioSemSenha = {
            id: funcionario.id,
            nome: funcionario.nome,
            email: funcionario.email,
            createdAt: funcionario.createdAt,
            updatedAt: funcionario.updatedAt
        }
        return funcionarioSemSenha
    }

    async atualizarFuncionario(id: string, funcionarioData: Partial<Funcionario>): Promise<Partial<Funcionario> | null> {
        const funcionario = await this.prisma.funcionario.update({ where: { id }, data: funcionarioData });
        const funcionarioSemSenha = {
            id: funcionario.id,
            nome: funcionario.nome,
            email: funcionario.email,
            createdAt: funcionario.createdAt,
            updatedAt: funcionario.updatedAt
        }
        return funcionarioSemSenha
    }

    async obterFuncionarioPorId(id: string): Promise<Funcionario | null> {
        return await this.prisma.funcionario.findUnique({ where: { id } });
    }

    async obterFuncionarios(): Promise<Funcionario[]> {
        return await this.prisma.funcionario.findMany();
    }

    async removerFuncionario(id: string): Promise<void> {
        await this.prisma.funcionario.delete({ where: { id } });
    }
}

export default FuncionarioRepository;
