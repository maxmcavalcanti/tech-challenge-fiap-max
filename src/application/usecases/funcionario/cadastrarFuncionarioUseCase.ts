import { Funcionario } from '@prisma/client';
import FuncionarioRepository from '../../../interfaces/repositories/funcionario.repository';

class CadastrarFuncionarioUseCase {
    constructor(private funcionarioRepository: FuncionarioRepository) { }

    async execute(funcionarioData: Funcionario): Promise<Funcionario> {
        const funcionario = await this.funcionarioRepository.criarFuncionario(funcionarioData);
        return funcionario;
    }
}

export default CadastrarFuncionarioUseCase;
