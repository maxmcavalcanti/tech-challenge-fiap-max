import FuncionarioRepository from '../../repositories/funcionario.repository';
import { Funcionario } from '../../entities/funcionario';

class CadastrarFuncionarioUseCase {
    constructor(private funcionarioRepository: FuncionarioRepository) { }

    async execute(funcionarioData: Partial<Funcionario>): Promise<Funcionario> {
        const funcionario = await this.funcionarioRepository.criarFuncionario(funcionarioData);
        return funcionario;
    }
}

export default CadastrarFuncionarioUseCase;
