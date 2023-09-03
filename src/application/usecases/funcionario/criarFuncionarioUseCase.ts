import { Funcionario } from "../../../domain/entities/funcionario";
import { FuncionarioRepository } from "../../../interfaces/repositories/funcionario.repository.interface";


class CriarFuncionarioUseCase {
    constructor(private funcionarioRepository: FuncionarioRepository) { }

    async execute(funcionarioData: Funcionario): Promise<Partial<Funcionario>> {
        const funcionario = await this.funcionarioRepository.criarFuncionario(funcionarioData);
        return funcionario;
    }
}

export default CriarFuncionarioUseCase;
