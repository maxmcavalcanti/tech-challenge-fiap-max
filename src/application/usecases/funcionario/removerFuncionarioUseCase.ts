import FuncionarioRepository from '../../../interfaces/repositories/funcionario.repository';
import { Funcionario } from '../../../domain/entities/funcionario';

class RemoverFuncionarioUseCase {
    constructor(private funcionarioRepository: FuncionarioRepository) { }

    async execute(id: string): Promise<Funcionario | null> {
        const funcionario = await this.funcionarioRepository.removerFuncionario(id);
        return funcionario;
    }
}

export default RemoverFuncionarioUseCase;
