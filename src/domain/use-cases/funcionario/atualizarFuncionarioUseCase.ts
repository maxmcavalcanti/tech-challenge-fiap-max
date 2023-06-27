import FuncionarioRepository from '../../repositories/funcionario.repository';
import { Funcionario } from '../../entities/funcionario';

class AtualizarFuncionarioUseCase {
    constructor(private funcionarioRepository: FuncionarioRepository) { }

    async execute(id: string, funcionarioData: Partial<Funcionario>): Promise<Funcionario | null> {
        const funcionario = await this.funcionarioRepository.atualizarFuncionario(id, funcionarioData);
        return funcionario;
    }
}

export default AtualizarFuncionarioUseCase;
