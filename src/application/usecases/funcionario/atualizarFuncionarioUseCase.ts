import FuncionarioRepository from '../../../interfaces/repositories/funcionario.repository';
import { Funcionario } from '../../../domain/entities/funcionario';

class AtualizarFuncionarioUseCase {
    constructor(private funcionarioRepository: FuncionarioRepository) { }

    async execute(id: string, funcionarioData: Partial<Funcionario>): Promise<Funcionario | null> {
        const funcionario = await this.funcionarioRepository.atualizarFuncionario(id, funcionarioData);
        return funcionario;
    }
}

export default AtualizarFuncionarioUseCase;
