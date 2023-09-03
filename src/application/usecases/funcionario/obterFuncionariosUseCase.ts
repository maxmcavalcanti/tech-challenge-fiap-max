
import { Funcionario } from "../../../domain/entities/funcionario";
import { FuncionarioRepository } from "../../../interfaces/repositories/funcionario.repository.interface";


export class ObterFuncionariosUseCase {
  constructor(private funcionarioRepository: FuncionarioRepository) { }

  async execute(): Promise<Funcionario[]> {
    const funcionarios = await this.funcionarioRepository.obterFuncionarios();
    return funcionarios;
  }
}