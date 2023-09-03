import { Funcionario } from "../../../domain/entities/funcionario";
import { FuncionarioRepository } from "../../../interfaces/repositories/funcionario.repository.interface";

class RemoverFuncionarioUseCase {
    constructor(private funcionarioRepository: FuncionarioRepository) { }

    async execute(id: string): Promise<void> {
        await this.funcionarioRepository.removerFuncionario(id);
    }
}

export default RemoverFuncionarioUseCase;
