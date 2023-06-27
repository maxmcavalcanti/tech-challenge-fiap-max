import FuncionarioRepository from '../../repositories/funcionario.repository';
import { Funcionario } from '../../entities/funcionario';

class RemoverFuncionarioUseCase {
    constructor(private funcionarioRepository: FuncionarioRepository) { }

    async execute(id: string): Promise<Funcionario | null> {
        const funcionario = await this.funcionarioRepository.removerFuncionario(id);
        return funcionario;
    }
}

export default RemoverFuncionarioUseCase;
