
import { Funcionario } from "../../../domain/entities/funcionario";
import { FuncionarioRepository } from "../../../interfaces/repositories/funcionario.repository.interface";


export class ObterFuncionarioPorIdUseCase {
  constructor(private funcionarioRepository: FuncionarioRepository) { }

  async execute(id: string): Promise<Funcionario | null> {
    const funcionario = await this.funcionarioRepository.obterFuncionarioPorId(id);
    return funcionario;
  }
}