import { Funcionario } from '../../domain/entities/funcionario'

export interface FuncionarioRepository {
    criarFuncionario(Funcionario: Funcionario): Promise<Partial<Funcionario>>;
    atualizarFuncionario(id: string, FuncionarioData: Partial<Funcionario>): Promise<Partial<Funcionario> | null>;
    obterFuncionarioPorId(id: string): Promise<Funcionario | null>;
    obterFuncionarios(): Promise<Funcionario[]>;
    removerFuncionario(id: string): Promise<void>;
}

