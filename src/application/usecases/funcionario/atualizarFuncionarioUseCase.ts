import { Funcionario } from "../../../domain/entities/funcionario";
import { FuncionarioRepository } from "../../../interfaces/repositories/funcionario.repository.interface";


class AtualizarFuncionarioUseCase {
    constructor(private funcionarioRepository: FuncionarioRepository) { }

    async execute(id: string, funcionarioData: Partial<Funcionario>): Promise<Partial<Funcionario> | null> {
        const funcionario = await this.funcionarioRepository.atualizarFuncionario(id, funcionarioData);
        return funcionario;
    }
}

export default AtualizarFuncionarioUseCase;
